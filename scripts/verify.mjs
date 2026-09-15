import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = "http://127.0.0.1:5173/";
mkdirSync("tmp", { recursive: true });

const browser = await chromium.launch();

async function capture(name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `tmp/${name}.png`, fullPage: true });
  return page;
}

const desktop = await capture("desktop", { width: 1440, height: 900 });
const mobile = await capture("mobile", { width: 390, height: 844 });

const approach = await desktop.locator("#abordagem").boundingBox();
await desktop.getByRole("link", { name: "Conhecer a abordagem" }).click();
await desktop.waitForTimeout(900);
const after = await desktop.evaluate(() => window.scrollY);

const wa = await desktop.locator('a[href*="wa.me/5586995498665"]').count();
const ig = await desktop.locator('a[href*="instagram.com/desencaixe_psi"]').count();
const prices = await desktop.locator("text=/R\\$|reais|valor da sessão/i").count();

await mobile.getByRole("button", { name: "Abrir menu" }).click();
await mobile.waitForTimeout(300);
await mobile.screenshot({ path: "tmp/mobile-menu.png" });

console.log(
  JSON.stringify(
    {
      approachExists: Boolean(approach),
      scrollYAfterCta: after,
      whatsappLinks: wa,
      instagramLinks: ig,
      priceMentions: prices,
    },
    null,
    2,
  ),
);

await browser.close();
