import { test } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { LoginPage } from "../../pages/LoginPage";
import { getUser } from "../../utils/userUtils";
import userList from "../../data/users.json";
import { CustomUrl } from "../../pages/CustomUrl";

const userTypes = userList.users
  .map((user) => user.type)
  .filter((type) => type !== "locked_out_user");

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test.describe("Successful logins", () => {
  for (const type of userTypes) {
    test(`logs in and logs out a ${type}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const customUrl = new CustomUrl(page);
      const user = getUser(userList.users, type);

      await loginPage.login(user);
      await customUrl.checkUrl({ shouldContain: /inventory.html/ });
    });
  }
});

test("fails to log in a locked_out_user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const user = getUser(userList.users, "locked_out_user");

  await loginPage.goto();
  await loginPage.login({ ...user, assertSuccess: false });
});

test.afterEach(async ({ page }) => {
  if (test.info().title !== "fails to log in a locked_out_user") {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
  }
});
