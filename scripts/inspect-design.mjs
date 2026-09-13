import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch({
  channel: process.platform === 'win32' ? 'msedge' : undefined,
  headless: true,
})
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
})
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
page.on('console', (message) => {
  if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text())
})
if (process.argv.includes('--reference')) {
  try {
    await page.goto('https://www.zephyr-tech.in/', { waitUntil: 'networkidle', timeout: 25000 })
    await page.waitForTimeout(3000)
    await page.screenshot({ path: 'artifacts/reference-desktop.png' })
    console.log('REFERENCE', (await page.locator('body').innerText()).slice(0, 6000))
  } catch (error) {
    console.log('Reference unavailable:', error.message)
  }
}
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2200)
await page.screenshot({ path: 'artifacts/entry-desktop.png' })
console.log(
  'ENTRY DESKTOP',
  await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    scrollLocked: document.documentElement.style.overflow === 'hidden',
    title: document.querySelector('.entry-title').getBoundingClientRect().toJSON(),
  })),
)
await page.getByRole('button', { name: 'ENTER LOBBY' }).click()
await page.locator('.intro-experience').waitFor({ state: 'detached' })
await page.waitForTimeout(1200)
await page.screenshot({ path: 'artifacts/restored-hero-desktop.png' })
console.log(
  'DESKTOP',
  await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    hero: document.getElementById('home').getBoundingClientRect().height,
    title: document.querySelector('.hero-wordmark').getBoundingClientRect().toJSON(),
  })),
)
await page.emulateMedia({ reducedMotion: 'reduce' })
await page.screenshot({ path: 'artifacts/current-desktop-full.png', fullPage: true })
await page.locator('#domains').scrollIntoViewIfNeeded()
await page.screenshot({ path: 'artifacts/current-desktop-domains.png' })
await page.setViewportSize({ width: 390, height: 844 })
await page.emulateMedia({ reducedMotion: 'no-preference' })
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2200)
await page.screenshot({ path: 'artifacts/entry-mobile.png' })
await page.getByRole('button', { name: 'ENTER LOBBY' }).click()
await page.locator('.intro-experience').waitFor({ state: 'detached' })
await page.waitForTimeout(1200)
await page.screenshot({ path: 'artifacts/restored-hero-mobile.png' })
await page.screenshot({ path: 'artifacts/current-mobile-full.png', fullPage: true })
console.log(
  'MOBILE',
  await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflowing: [...document.querySelectorAll('main *')]
      .filter((el) => {
        const rect = el.getBoundingClientRect()
        return (
          rect.width &&
          (rect.right > innerWidth + 1 || rect.left < -1) &&
          getComputedStyle(el).position !== 'absolute' &&
          !(el instanceof SVGElement)
        )
      })
      .slice(0, 20)
      .map((el) => ({
        tag: el.tagName,
        className: el.className,
        width: el.getBoundingClientRect().width,
      })),
  })),
)
console.log('BROWSER ERRORS', JSON.stringify(errors))
await browser.close()
