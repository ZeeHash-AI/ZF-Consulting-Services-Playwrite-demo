import { test, expect } from "@playwright/test";

test("Zee AI Demo Test — Homepage loads and title is correct", async ({ page }) => {
  const start = Date.now();

  await page.goto("https://playwright.dev");

  // Functional check
  await expect(page).toHaveTitle(/Playwright/);

  const loadTime = Date.now() - start;

  console.log("⏱ Load Time:", loadTime + "ms");
  console.log("✔ Functional test passed");
});
