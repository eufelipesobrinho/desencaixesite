import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.getByRole("heading", { name: "Ansiedade" }).scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: "tmp/help-new-cards.png" });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await mobile.getByRole("heading", { name: "Ansiedade" }).scrollIntoViewIfNeeded();
await mobile.waitForTimeout(300);
await mobile.screenshot({ path: "tmp/help-new-cards-mobile.png" });

const faq = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await faq.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await faq.getByText("Qual o público da Marta?").click();
await faq.waitForTimeout(300);
await faq.screenshot({ path: "tmp/faq-audience.png" });

console.log("ok");
await browser.close();
