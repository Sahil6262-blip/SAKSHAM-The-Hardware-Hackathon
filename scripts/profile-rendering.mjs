import { chromium } from '@playwright/test'
import { writeFile } from 'node:fs/promises'

const label = process.argv[2] || 'current'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const client = await page.context().newCDPSession(page)
await client.send('Performance.enable')
await client.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)
const results = {}
async function measure(name, scrolling = false) {
  const before = (await client.send('Performance.getMetrics')).metrics
  const events = []
  const receive = ({ value }) => events.push(...value)
  client.on('Tracing.dataCollected', receive)
  await client.send('Tracing.start', {
    categories: 'devtools.timeline',
    transferMode: 'ReportEvents',
  })
  const frames = await page.evaluate(async (scrolling) => {
    const intervals = []
    const start = performance.now()
    let previous = start
    await new Promise((resolve) => {
      function frame(time) {
        intervals.push(time - previous)
        previous = time
        if (scrolling) window.scrollTo(0, (time - start) * 1.3)
        if (time - start < 3500) requestAnimationFrame(frame)
        else resolve()
      }
      requestAnimationFrame(frame)
    })
    return intervals.filter((value) => value > 0)
  }, scrolling)
  const complete = new Promise((resolve) => client.once('Tracing.tracingComplete', resolve))
  await client.send('Tracing.end')
  await complete
  client.off('Tracing.dataCollected', receive)
  const after = (await client.send('Performance.getMetrics')).metrics
  const delta = (key) =>
    +(after.find((m) => m.name === key).value - before.find((m) => m.name === key).value).toFixed(3)
  const paints = events.filter((event) => event.name === 'Paint' && event.ph === 'X')
  results[name] = {
    frames: frames.length,
    frameP95ms: +frames.sort((a, b) => a - b)[Math.floor(frames.length * 0.95)].toFixed(1),
    framesOver34ms: frames.filter((value) => value > 34).length,
    paintEvents: paints.length,
    paintTimeMs: +(paints.reduce((sum, event) => sum + (event.dur || 0), 0) / 1000).toFixed(1),
    taskSeconds: delta('TaskDuration'),
    layoutSeconds: delta('LayoutDuration'),
  }
}
await measure('intro')
await page.getByRole('button', { name: 'ENTER LOBBY' }).click()
await page.locator('.intro-experience').waitFor({ state: 'detached' })
await page.waitForTimeout(2500)
await measure('hero')
await measure('scroll', true)
await browser.close()
await writeFile(`artifacts/chrome-rendering-${label}.json`, JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
