# PARIPATH'26

A standalone React + Vite frontend for the VCET hardware hackathon, organized by the Department of Electronics and Telecommunications Engineering in association with **IEEE-SB × IETE-SF**.

The design follows a hardware system powering on: an original isometric processor illustration, luminous PCB traces, industrial typography, five connected domain modules, and a circuit that activates as the visitor scrolls. The Zephyr reference informed the emphasis on a strong event identity, cinematic depth, and page pacing. All PARIPATH graphics, layouts, branding, and code were built for this project.

## Run locally

```sh
npm install
npm run dev
```

Open the local address printed by Vite, normally `http://localhost:5173`.

## Production build and preview

```sh
npm run build
npm run preview
```

Vite generates a static `dist/` directory. On Vercel, select the **Vite** preset, use **npm run build**, and set the output directory to **dist**. The site needs no backend, database, account system, or payment integration.

## Connect the Google Form

Open **src/data/eventConfig.js** and replace this one setting:

```js
registrationUrl: 'PASTE_GOOGLE_FORM_URL_HERE',
```

Use your real HTTPS `forms.gle` or `docs.google.com/forms/` URL. Every registration button, including the navbar, hero, final registration section, and footer, reads that same setting and opens the form in a new tab with `noopener noreferrer`.

Until a valid URL is supplied, each button opens a keyboard-accessible dialog that explains the link is coming soon and directs students to the organizing team. No form URL is fabricated, and the site does not collect or submit registration data.

## Official logos

Place your official files at:

```text
public/assets/vcet-logo.png
public/assets/ieee-logo.png
public/assets/iete-logo.png
```

The `InstitutionalLogo` component detects available assets at build time and uses clean text lockups while logos are absent. Missing files do not generate broken image requests. Restart Vite or rebuild after adding files. Fonts are bundled locally through Fontsource, so visitors do not need a connection to Google Fonts.

## Remaining organizer content

- **Google Form:** `registrationUrl` in `src/data/eventConfig.js`.
- **Official logos:** the three paths above.
- **Problem statements:** add official objects to the empty array in `src/data/problemStatements.js`. The supported fields are `id`, `domainId`, `title`, `description`, and an optional `url`. The page automatically replaces the coming-soon display when entries exist.
- **Instagram URLs:** add confirmed URLs to the `socials` array in `eventConfig.js`. Supplied handles are displayed as text until URLs are provided.
- **Detailed schedule and hardware guidelines:** pending official release. Add confirmed timeline information to `src/data/timeline.js` and update the relevant FAQ when supplied. The current timeline does not fabricate clock times or dates.

The countdown uses the event date at midnight in **Asia/Kolkata / UTC+05:30**, as provided in the brief. It displays “IS LIVE” on 1 October and “HAS CONCLUDED” at the next India calendar day. These are date-level display boundaries, not invented official start/end times. Update `eventDate` and `eventEndDate` when exact schedule times are confirmed. Countdown values never become negative.

## Animation and interaction systems

- **GSAP:** 1.95-second boot sequence, staged hero reveal, masked heading reveals, sequential circuit activation, build stages, number counters, domain activation, timeline progression, and registration illumination.
- **GSAP ScrollTrigger + Lenis:** a shared animation ticker, responsive scroll measurements, anchor scrolling with the fixed navigation offset, and teardown of listeners/tickers/contexts on unmount.
- **Framer Motion:** animated mobile navigation, domain press feedback, and accessible FAQ expansion. It does not compete with GSAP for transforms on the same elements.
- **SVG/CSS:** original layered motherboard and raised processor, small hardware modules, four restrained traveling electrical signals, circuit traces, and technical markers.
- **Reduced motion:** skips the intro and parallax, disables continuous signals and smooth scrolling, removes long scroll choreography, and immediately displays content.

## Checks

```sh
npm run lint
npm test
npm run build
npm run test:e2e
```

The browser tests use the **production preview**, not the development bundle. The suite covers:

- 1920, 1440, 1366, 1024, 768, 430, 390, and 360-pixel layouts.
- Horizontal overflow and clipped domain descriptions.
- Correctly finished intro and functioning smooth section navigation.
- Mouse and keyboard domain activation and FAQ behavior.
- Mobile menu escape handling, selection, and resizing to desktop.
- Registration placeholder dialog, focus restoration, and phone links.
- All four registration links sharing a valid Google Form configuration.
- India-time countdown boundaries and live/concluded displays.
- Automated WCAG A/AA accessibility checks on desktop and mobile, including the registration dialog.
- Browser runtime errors, warnings, failed assets, and reduced motion.

Playwright uses the installed Microsoft Edge on Windows and Chromium elsewhere. If Chromium is needed on another system, run `npx playwright install chromium` once.

For screenshots, run the dev server and then `npm run check:visual`. Images are saved under the ignored `artifacts/` folder. `npm run format` formats the project source.

## File inventory

Created:

```text
src/components/
  About.jsx
  BuildFlow.jsx
  CircuitBackground.jsx
  Countdown.jsx
  Domains.jsx
  DurationSection.jsx
  Eligibility.jsx
  EventMarquee.jsx
  EventStats.jsx
  FAQ.jsx
  Footer.jsx
  HardwareScene.jsx
  Hero.jsx
  InstitutionalLogo.jsx
  IntroLoader.jsx
  Navbar.jsx
  PrizePool.jsx
  ProblemStatements.jsx
  RegisterButton.jsx
  RegisterCTA.jsx
  Timeline.jsx
src/data/
  domains.js
  eventConfig.js
  faqs.js
  problemStatements.js
  timeline.js
src/hooks/
  useLenis.js
  usePageAnimation.js
  useReducedMotion.js
src/styles/
  details.css
  domains.css
  fonts.css
  globals.css
  hardware.css
src/utils/
  countdown.js
  registration.js
tests/
  accessibility.spec.js
  logic.test.mjs
  site.spec.js
scripts/inspect-design.mjs
public/assets/README.md
playwright.config.js
.prettierrc.json
```

Replaced or updated: `src/App.jsx`, `src/main.jsx`, `index.html`, `public/favicon.svg`, `vite.config.js`, `package.json`, `package-lock.json`, `.gitignore`, and this `README.md`.

Removed unused starter styles and graphics: `src/App.css`, `src/index.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, and `public/icons.svg`.
