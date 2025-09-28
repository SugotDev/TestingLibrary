import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    specPattern: "cypress/e2e/saucedemo/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    screenShotOnRunFailure: true,
    video: false,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
