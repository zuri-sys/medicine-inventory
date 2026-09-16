import { chromium } from '../frontend/node_modules/playwright-core/index.mjs';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('deliverables');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
async function shot(name, label) {
  await page.evaluate((text) => { const old=document.querySelector('[data-capture-label]'); if(old) old.remove(); const el=document.createElement('div'); el.dataset.captureLabel='true'; el.textContent=text; el.style.cssText='position:fixed;z-index:9999;top:12px;left:50%;transform:translateX(-50%);padding:8px 16px;border-radius:999px;background:#102b55;color:#fff;font:700 16px system-ui;box-shadow:0 4px 16px #0004'; document.body.append(el); }, label);
  await page.screenshot({ path: resolve(root, name), fullPage: true });
  await page.evaluate(() => document.querySelector('[data-capture-label]')?.remove());
}
await page.goto('http://127.0.0.1:5173/login');
await page.getByLabel('Username').fill('wronguser'); await page.getByLabel('Password').fill('wrongpassword'); await page.getByRole('button', {name:'Login'}).click();
await shot('a-failed-login.png', '(a) Failed Login Attempt');
await page.getByLabel('Username').fill('pharmacist'); await page.getByLabel('Password').fill('med123'); await page.getByRole('button', {name:'Login'}).click();
await page.getByRole('link', {name:/Medicine List/}).click(); await page.waitForSelector('table');
await shot('b-medicine-list.png', '(b) Medicine List After Successful Login');
await page.getByLabel('Add medicine').click(); await page.getByRole('button', {name:'Add Medicine'}).click();
await shot('c-invalid-add.png', '(c) Add Medicine Screen With All Fields Invalid');
await page.getByLabel('Brand Name').fill('Amoxicillin'); await page.getByLabel('Category').fill('Antibiotic'); await page.getByLabel('Stock Quantity').fill('60'); await page.getByRole('button', {name:'Add Medicine'}).click();
await page.getByRole('link', {name:'View Details'}).first().click(); await page.waitForSelector('dl');
await shot('d-medicine-details.png', '(d) Medicine Details Screen Displaying Newly Added Item');
await browser.close();

