import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("tmp", { recursive: true });
const browser = await chromium.launch();
const url = "http://127.0.0.1:5173/";

async function shot(name, viewport, selector) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: "networkidle" });
  if (selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  } else {
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: `tmp/${name}.png` });
  const body = await page.locator("body").innerText();
  const wa = await page.locator('a[href*="wa.me/5586995498665"]').count();
  const wrong = await page
    .locator('a[href*="wa.me/"]')
    .evaluateAll((els) =>
      els.map((el) => el.href).filter((href) => !href.includes("5586995498665")),
    );
  await page.close();
  return {
    name,
    wa,
    wrong,
    hasPlainMartaLima: /\bMarta Lima\b/.test(body),
    hasNewName: body.includes("Marta Ferreira Lima"),
    hasOldAud: body.includes("12 a 35"),
    hasNewAud: body.includes("18 a 45"),
    hasAnsiedade: body.includes("Ansiedade"),
    hasAutoestima: body.includes("Autoestima"),
    hasAutocobranca: body.includes("Autocobrança"),
    hasDepressao: body.includes("Depressão"),
    hasAutoconh: body.includes("Autoconhecimento"),
  };
}

const reports = {
  desktop: await shot("hero-desktop", { width: 1440, height: 900 }, null),
  help: await shot("help-desktop", { width: 1440, height: 900 }, "#help-title"),
  about: await shot("about-desktop", { width: 1440, height: 900 }, "#sobre"),
  faq: await shot("faq-desktop", { width: 1440, height: 900 }, "#duvidas"),
  mobile: await shot("hero-mobile", { width: 390, height: 844 }, null),
  helpMobile: await shot("help-mobile", { width: 390, height: 844 }, "#help-title"),
};

console.log(JSON.stringify(reports, null, 2));
await browser.close();
