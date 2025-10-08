import { defineConfig } from "cypress";
import fs from "fs";
import path from "path";

export default defineConfig({
  e2e: {
    env: {
      snapshotOnly: true,
    },
    baseUrl: "http://localhost:3001",
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",

    setupNodeEvents(on, config) {
      on("task", {
        resetDb() {
          const dbPath = path.resolve(__dirname, "db.json");
          const initialState = { pets: [] };
          fs.writeFileSync(
            dbPath,
            JSON.stringify(initialState, null, 2),
            "utf-8"
          );
          return null;
        },
      });

      return config;
    },
  },
});
