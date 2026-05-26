/**
 * Author: Zee Hashmi
 */

import { test, expect } from "@playwright/test";

test("Zee AI Demo Test — Homepage loads and title is correct", async ({ page }) => {
  const start = Date.now();

  try {
    await page.goto("https://playwright.dev", { waitUntil: "networkidle", timeout: 15000 });

    // Functional check
    await expect(page).toHaveTitle(/Playwright/);

    const loadTime = Date.now() - start;

    console.log("⏱ Load Time:", loadTime + "ms");
    console.log("✔ Functional test passed");
  } catch (error) {
    console.error("✗ Test failed:", error instanceof Error ? error.message : String(error));
    throw error;
  }
});
