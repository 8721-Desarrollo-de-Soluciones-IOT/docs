// Records a narrated walkthrough video of the clickable prototype for each product
// and saves a screenshot per video. Usage: node record-prototype.mjs <videoOutDir>
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync, renameSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const req = createRequire(import.meta.url);
const { chromium } = (() => { try { return req('playwright'); } catch { return req(path.join(execSync('npm root -g').toString().trim(), 'playwright')); } })();
const here = path.dirname(fileURLToPath(import.meta.url));
const shots = path.resolve(here, '../../assets/chapter-5/prototyping');
const videos = path.resolve(process.argv[2] || path.join(here, 'videos'));
mkdirSync(shots, { recursive: true }); mkdirSync(videos, { recursive: true });

const W = 1440, H = 900;
const caption = (page, text) => page.evaluate((t) => {
  let c = document.getElementById('narration');
  if (!c) {
    c = document.createElement('div'); c.id = 'narration';
    c.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);background:rgba(16,42,67,.92);color:#fff;padding:12px 22px;border-radius:12px;font:500 17px Roboto,sans-serif;z-index:99;max-width:900px;text-align:center';
    document.body.appendChild(c);
  }
  c.textContent = t;
}, text);

const SCRIPTS = {
  'landing-page': [
    ['lp-desktop', 'Landing Page (desktop): value proposition and one call-to-action per segment.'],
    ['scroll', 900, 'How it works: the four steps of a session, in order.'],
    ['scroll', 1900, 'Benefits split by audience: shoppers and store operators.'],
    ['click', '[data-go="lp-contact"]', 'Supermarkets jump straight to the demo request form.'],
    ['click', '[data-act="submit-demo"]', 'Submitting the form confirms the request (US02).'],
    ['start', 'lp-mobile', 'Landing Page (mobile): same content, single column and a hamburger menu.'],
    ['scroll', 1400, 'Cards stack vertically; touch targets stay at 48 px.'],
    ['click', '[data-go="lp-contact"]', '“I run a supermarket” scrolls to the mobile form.'],
  ],
  'web-console': [
    ['wa-login', 'Web Console: floor supervisors sign in with their staff account.'],
    ['click', '[data-go="wa-dashboard"]', 'Dashboard: KPIs, active sessions and live alerts first (visual hierarchy).'],
    ['click', '#screen [data-go="wa-carts"]', 'Carts: filter chips by status, search and a sortable table (US11).'],
    ['click', 'tr[data-go="wa-cart-detail"]', 'Cart detail: expected vs measured weight explains the discrepancy.'],
    ['click', '[data-go="wa-unlock"]', 'Unlocking needs a resolution and the supervisor PIN, for the audit log.'],
    ['click', '[data-act="unlock"]', 'The cart returns to the list and the action is confirmed.'],
    ['click', '#screen [data-go="wa-alerts"]', 'Alerts: geofence breaches, weight and RFID issues in tabs (US12).'],
    ['click', '#screen [data-go="wa-catalog"]', 'Catalog: price, nominal weight and tolerance per SKU (US13).'],
    ['click', '[data-go="wa-catalog-edit"]', 'Editing a tolerance shows the allowed range before saving.'],
    ['click', '[data-act="save-sku"]', 'Saving syncs the rule to the edge gateway and every cart.'],
  ],
  'mobile-app': [
    ['ma-login', 'Mobile App: the shopper signs in.'],
    ['click', '[data-go="ma-home"]', 'Home: start a session, default budget and recent receipts.'],
    ['click', '#screen [data-go="ma-pair"]', 'Link a cart: the camera reads the code shown on the cart screen.'],
    ['click', '[data-go="ma-budget"]', 'Set a budget; the 90% alert applies on the phone and on the cart (US04).'],
    ['click', '#screen [data-go="ma-cart"]', 'The cart mirrors in real time: total, budget bar and items (US05).'],
    ['click', '[data-go="ma-pay"]', 'Checkout: pay with Yape, Plin or the QR on the cart (US08).'],
    ['click', '[data-go="ma-receipt"]', 'Payment confirmed: electronic receipt and exit clearance.'],
    ['click', '#screen [data-go="ma-home"]', 'Back home; receipts stay in the history tab.'],
    ['click', '#screen [data-go="ma-history"]', 'Receipts: search, date filters and monthly spending.'],
  ],
  'on-cart-display': [
    ['cd-welcome', 'On-Cart Display: the cart waits for a shopper, with a QR to link the app.'],
    ['click', '#screen [data-go="cd-budget"]', 'Optional budget with large keys and preset amounts (US04).'],
    ['click', '#screen [data-go="cd-session"]', 'Every product read by RFID and weight appears with the running total (US05, US06).'],
    ['click', '#sim [data-go="cd-removed"]', 'Taking an item out subtracts it automatically (US07).'],
    ['click', '#sim [data-go="cd-unknown"]', 'An unreadable tag asks the shopper to place the item again.'],
    ['click', '#sim [data-go="cd-discrepancy"]', 'Weight without a tag read pauses payment and notifies a supervisor (US09).'],
    ['click', '#screen [data-go="cd-session"]', 'Once fixed, the session continues.'],
    ['click', '#sim [data-go="cd-threshold"]', 'At 90% of the budget an amber alert appears (US05).'],
    ['click', '#screen [data-go="cd-checkout"]', 'Checkout shows a dynamic QR for Yape or Plin (US08).'],
    ['click', '#sim [data-go="cd-paid"]', 'The wallet webhook confirms payment and grants exit clearance (TS03).'],
  ],
};

const browser = await chromium.launch();
for (const [name, steps] of Object.entries(SCRIPTS)) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: videos, size: { width: W, height: H } } });
  const page = await ctx.newPage();
  const [first, firstCaption] = steps[0];
  await page.goto(`file://${here}/app/index.html#${first}`);
  await page.waitForTimeout(1200);
  await caption(page, firstCaption);
  await page.waitForTimeout(3200);
  let i = 0;
  for (const step of steps.slice(1)) {
    const [kind, arg, text] = step;
    if (kind === 'scroll') await page.evaluate((y) => document.getElementById('vp').scrollTo({ top: y, behavior: 'smooth' }), arg);
    if (kind === 'click') await page.click(arg);
    if (kind === 'start') await page.click(`.tab[data-start="${arg}"]`);
    await caption(page, text);
    await page.waitForTimeout(3400);
    if (++i === Math.ceil(steps.length / 2)) await page.screenshot({ path: path.join(shots, `${name}.png`) });
  }
  const video = page.video();
  await ctx.close();
  renameSync(await video.path(), path.join(videos, `${name}.webm`));
  console.log('recorded', name);
}
await browser.close();
