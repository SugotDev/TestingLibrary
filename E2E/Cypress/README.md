# TestingLibrary – Cypress E2E Tests

## Project Overview

The main focus is on E2E tests implemented in Cypress for the demo application [saucedemo.com](https://www.saucedemo.com/).

## Requirements

- Node.js (recommended: LTS version)
- Yarn or npm
- Chrome or another browser supported by Cypress

## Installation

1. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

2. Configure the `cypress.env.json` file with appropriate test data (e.g., users).

## Running Tests

- Interactive mode (GUI):

  ```bash
  yarn cy:open
  # or
  npx cypress open
  ```

- Headless mode:
  ```bash
  yarn cy:run
  # or
  npx cypress run
  ```

## Test Structure

- E2E tests are located in:
  `E2E/Cypress/cypress/e2e/saucedemo/`
- Shared functions and user types:
  `E2E/Cypress/cypress/utils/user.ts`
- Custom commands:
  `E2E/Cypress/cypress/support/commands.ts`

## Example Test

```typescript
it("logs in and logs out a standard user successfully", () => {
  const standardUser = getUser(users, "standard_user");
  cy.login(standardUser);
});
```

## Additional Information

- You can extend the tests with new scenarios and user types.
- Various user types are supported (standard, problem, visual, locked_out, etc.).
- You can add your own custom commands in `commands.ts` as needed.

## Contact

For questions or suggestions, please contact the repository author.
