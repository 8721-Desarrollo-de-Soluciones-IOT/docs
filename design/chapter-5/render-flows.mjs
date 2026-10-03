// Renders every wireflow and user flow in flows/flows.js to assets/chapter-5.
// Run render-screens.mjs first: the diagrams embed the screen PNGs.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const req = createRequire(import.meta.url);
const { chromium } = (() => { try { return req('playwright'); } catch { return req(path.join(execSync('npm root -g').toString().trim(), 'playwright')); } })();
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../assets/chapter-5');

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1.5, viewport: { width: 1400, height: 900 } });
await page.goto(`file://${here}/flows/diagram.html?flow=g1-start-session`);
await page.waitForSelector('body[data-ready]');
const ids = await page.evaluate(() => Object.keys(FLOWS));
for (const kind of ['wireflow', 'userflow']) {
  const dir = path.join(out, kind === 'wireflow' ? 'wireflows' : 'user-flows');
  mkdirSync(dir, { recursive: true });
  for (const id of ids) {
    await page.goto(`file://${here}/flows/diagram.html?flow=${id}&kind=${kind}`);
    await page.waitForSelector('body[data-ready]');
    await (await page.$('#board')).screenshot({ path: path.join(dir, `${id}.png`) });
    console.log(kind, id);
  }
}
await browser.close();
