# Chapter 5 · UI/UX design source

Source of every wireframe, mock-up, wireflow, user flow and prototype in chapter V of the report.
All screens are written once in HTML/CSS with the design tokens from 5.1.1; the same code renders
the low-fidelity wireframe (`.wf` mode), the mock-up and the clickable prototype.

| Path | Content |
| :--- | :--- |
| `app/index.html` | Clickable prototype. Open it in a browser; tabs switch product, "Show wireframe" toggles fidelity, the side panel simulates cart sensors and payment webhooks. |
| `app/kit.js` | Shared helpers, logo, demo catalog and session data. |
| `app/landing.js`, `app/console.js`, `app/mobile.js`, `app/cart-display.js` | Screens of each product. |
| `app/styles.css` | Design tokens and components (Material Design 3 shapes). |
| `app/fonts/` | Inter, Roboto, Roboto Mono and Material Symbols, vendored so it works offline. |
| `flows/flows.js` | Wireflows and user flows, one per user goal. |

## Regenerating the images

Requires Node 18+ and Playwright with Chromium (`npm i -D playwright && npx playwright install chromium`).

```bash
node render-screens.mjs          # assets/chapter-5/wireframes and mockups
node render-flows.mjs            # assets/chapter-5/wireflows and user-flows
node record-prototype.mjs videos # narrated .webm walkthrough per product + screenshots in assets/chapter-5/prototyping
```

PNGs in the repo were reduced to a 256-color palette (Pillow `quantize`) to keep the repository light.

Videos are not committed; upload them to Microsoft Stream and paste the links in section 5.5.
