// Renders every registered screen as wireframe and mock-up PNGs into assets/chapter-5.
// Usage: node render-screens.mjs [screenId ...]
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Uses the project's playwright if installed, otherwise the global one.
const req = createRequire(import.meta.url);
const { chromium } = (() => { try { return req('playwright'); } catch { return req(path.join(execSync('npm root -g').toString().trim(), 'playwright')); } })();

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../assets/chapter-5');
const page_url = (id, mode) => `file://${here}/app/render.html?screen=${id}&mode=${mode}`;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1440, height: 900 } });
await page.goto(page_url('lp-desktop', 'mock'));
await page.waitForSelector('body[data-ready]');
let ids = await page.evaluate(() => Object.keys(IC.SCREENS));
if (process.argv.length > 2) ids = ids.filter((i) => process.argv.slice(2).includes(i));

for (const mode of ['wf', 'mock']) {
  const dir = path.join(out, mode === 'wf' ? 'wireframes' : 'mockups');
  mkdirSync(dir, { recursive: true });
  for (const id of ids) {
    await page.goto(page_url(id, mode));
    await page.waitForSelector('body[data-ready]');
    await page.waitForTimeout(150);
    const el = await page.$('#root > .screen');
    await el.screenshot({ path: path.join(dir, `${id}.png`) });
    console.log(mode, id);
  }
}
await browser.close();
