import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("tmp", { recursive: true });
const browser = await chromium.launch();
const url = "http://127.0.0.1:5173/";

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(url, { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Abrir menu" }).click();
await mobile.waitForTimeout(400);
await mobile.screenshot({ path: "tmp/mobile-menu.png" });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(url, { waitUntil: "networkidle" });
await desktop.locator("#contato").scrollIntoViewIfNeeded();
await desktop.waitForTimeout(400);
await desktop.screenshot({ path: "tmp/cta-desktop.png" });

await desktop.locator("#inicio").scrollIntoViewIfNeeded();
await desktop.waitForTimeout(300);
await desktop.screenshot({ path: "tmp/hero-desktop.png" });

await browser.close();
console.log("ok");
