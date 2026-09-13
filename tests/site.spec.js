import { test, expect } from '@playwright/test'

async function enterParipath(page) {
  const intro = page.locator('.intro-experience')
  await expect(intro).toBeVisible()
  await page.getByRole('button', { name: 'ENTER LOBBY' }).click()
  await expect(intro).toHaveCount(0, { timeout: 2500 })
}

const widths = [1920, 1440, 1366, 1024, 768, 430, 390, 360]
for (const width of widths) {
  test(`layout remains readable without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1080 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
    })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('.intro-experience')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden')
    await enterParipath(page)
    await expect(page.getByRole('heading', { name: 'SAKSHAM’26', exact: true })).toBeVisible()
    await expect(page.locator('.domain-module')).toHaveCount(5)
    await expect(page.locator('.rulebook-chapter')).toHaveCount(6)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
    expect(
      await page.locator('.hero-wordmark').evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    ).toBe(true)
    for (const module of await page.locator('.domain-module').all()) {
      expect(await module.evaluate((el) => el.scrollHeight <= el.clientHeight + 1)).toBe(true)
    }
    await expect(page.locator('.intro-experience')).toHaveCount(0)
    expect(errors).toEqual([])
  })
}

test('boot finishes, navigation works, and normal-motion pages have no runtime warnings', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) errors.push(message.text())
  })
  await page.goto('/')
  await enterParipath(page)
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Domains', exact: true })
    .click()
  await expect
    .poll(() =>
      page.locator('#domains').evaluate((el) => Math.abs(el.getBoundingClientRect().top - 88)),
    )
    .toBeLessThan(10)
  await expect(page.locator('.intro-experience')).toHaveCount(0)
  await page.locator('.domain-module-04').click()
  await expect(page.locator('.domain-module-04')).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.domain-module-01')).toHaveAttribute('aria-pressed', 'false')
  await page.locator('.domain-module-05').focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.domain-module-05')).toHaveAttribute('aria-pressed', 'true')
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'FAQ', exact: true })
    .click()
  await page.getByRole('button', { name: 'What is the registration fee?' }).click()
  await expect(page.getByRole('region', { name: 'What is the registration fee?' })).toContainText(
    '₹200',
  )
  await expect(page.getByRole('button', { name: 'What is the registration fee?' })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await page.getByRole('button', { name: 'What is the registration fee?' }).click()
  await expect(page.getByRole('button', { name: 'What is the registration fee?' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Rules', exact: true })
    .click()
  await expect(page.getByRole('heading', { name: 'SAKSHAM: MISSION CONTROL' })).toBeVisible()
  await expect(page.locator('.rulebook-chapter')).toHaveCount(6)
  expect(errors).toEqual([])
})

test('placeholder registration explains the pending link and returns keyboard focus', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await enterParipath(page)
  const trigger = page.locator('.nav-register')
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Registration update' })
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('registration link is coming soon')
  await expect(dialog).toContainText('25 September 2026')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await dialog.getByRole('link', { name: 'Contact the team' }).click()
  await expect(dialog).not.toBeVisible()
  await expect(page.locator('a[href="tel:+919137444346"]')).toBeVisible()
  await expect(page.locator('a[href="tel:+917774093453"]')).toBeVisible()
})

test('one valid Google Form setting updates every registration CTA', async ({ page }) => {
  const formUrl = 'https://forms.gle/paripath-test-only'
  // Intercept only the compiled asset in this browser. No source/config mutations.
  await page.route('**/assets/*.js', async (route) => {
    const response = await route.fetch()
    const body = (await response.text()).replaceAll('PASTE_GOOGLE_FORM_URL_HERE', formUrl)
    await route.fulfill({
      response,
      body,
      headers: { ...response.headers(), 'content-type': 'application/javascript' },
    })
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await enterParipath(page)
  const links = page.locator('a.register-button')
  await expect(links).toHaveCount(4)
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', formUrl)
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
})

test('mobile navigation supports escape, section selection, and desktop resizing', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await enterParipath(page)
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Domains' })
    .click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
  await expect
    .poll(() => page.locator('#domains').evaluate((el) => el.getBoundingClientRect().top))
    .toBeLessThan(120)
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.setViewportSize({ width: 1440, height: 900 })
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
})

for (const [date, status] of [
  ['2026-09-05T12:00:00+05:30', 'upcoming'],
  ['2026-10-01T09:00:00+05:30', 'IS LIVE'],
  ['2026-10-02T00:00:00+05:30', 'HAS CONCLUDED'],
]) {
  test(`countdown displays ${status} at the correct India date`, async ({ page }) => {
    await page.clock.setFixedTime(new Date(date))
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await enterParipath(page)
    if (status === 'upcoming') await expect(page.getByRole('timer')).toBeVisible()
    else await expect(page.locator('.countdown-event-state')).toContainText(status)
  })
}
