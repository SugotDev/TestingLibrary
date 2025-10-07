import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/saucedemo",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  timeout: 60 * 1000,
  use: {
    baseURL: "https://www.saucedemo.com/",
    trace: "on-first-retry",
    headless: false,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
