import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [1440, 390]) {
  test(`accessible document and registration dialog at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const audit = async () => {
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
      return result.violations.map((violation) => ({
        rule: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      }))
    }
    expect(await audit()).toEqual([])
    await page.getByRole('button', { name: 'ENTER LOBBY' }).click()
    await expect(page.locator('.intro-experience')).toHaveCount(0)
    expect(await audit()).toEqual([])
    await page.locator('.nav-register').click()
    expect(await audit()).toEqual([])
  })
}
