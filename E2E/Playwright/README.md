# TestingLibrary – Playwright E2E Tests

This directory contains automated end-to-end tests built with **Microsoft Playwright**.  
The tests cover the [SauceDemo](https://www.saucedemo.com/) application.

## Requirements

- Node.js (recommended: LTS version)
- Yarn or npm
- Browser supported by Playwright (Chromium, Firefox, WebKit)

## Installation

1. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

2. Configure the `users.json` file with appropriate test data (e.g., users).

## Running Tests

```bash
# Install dependencies
yarn install

# Run all tests (headless mode by default)
yarn playwright test

# Run tests with UI (headed mode)
yarn playwright test --headed
```

## Test Structure

- E2E tests are located in:  
  `E2E/Playwright/tests/`

- Page Object Model (POM) classes:  
  `E2E/Playwright/pages/`

- Reusable components (buttons, headers, etc.):  
  `E2E/Playwright/components/`

- Shared functions and utilities (e.g., user management):  
  `E2E/Playwright/utils/userUtils.ts`

- Test data (users, static content):  
  `E2E/Playwright/data/users.json`

## Example Test

```typescript
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { getUser } from "../utils/userUtils";
import userList from "../data/users.json";

test("logs in and logs out a standard user successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const user = getUser(userList.users, "standard_user");

  await loginPage.goto();
  await loginPage.login(user);
  await inventoryPage.logout();
});
```

## Additional Information

- You can extend the tests with new scenarios and user types.
- Various user types are supported (`standard_user`, `problem_user`, `visual_user`, `locked_out_user`, etc.).
- Shared test logic and helpers can be added in `utils/` (e.g., `userUtils.ts`).
- Page Object Model (POM) is used for better test structure — all page interactions are defined in the `pages/` directory.
- You can configure test behavior, browser type, and timeouts in `playwright.config.ts`.

## Contact

For questions or suggestions, please contact the repository author.

```

```
