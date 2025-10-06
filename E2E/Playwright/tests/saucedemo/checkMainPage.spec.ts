import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { getUser } from "../../utils/userUtils";
import userList from "../../data/users.json";
import { HeaderPage } from "../../pages/HeaderPage";
import {
  InventoryItem,
  InventoryItemOptions,
} from "../../components/InventoryItem";
import { Button } from "../../components/Button";

const userTypes = userList.users
  .map((user) => user.type)
  .filter((type) => type !== "locked_out_user");

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test.describe("Check main page for multiple users", () => {
  for (const type of userTypes) {
    test(`logs in as a ${type} and checks headers`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const firstHeaderPage = new HeaderPage(page, ".header_label");
      const secondaryHeaderPage = new HeaderPage(
        page,
        '[data-test="secondary-header"]'
      );
      const user = getUser(userList.users, type);

      await loginPage.login(user);
      await firstHeaderPage.checkHeader({
        background:
          "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box",
        height: "48px",
        logoSelector: ".app_logo",
        text: "Swag Labs",
      });
      await secondaryHeaderPage.checkHeader({
        background:
          "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box",
        height: "56px",
        text: "Products",
      });
    });

    test(`logs in as a ${type} and checks product cards`, async ({ page }) => {
      // bug with problem_user - images are all the same
      // bug with visual_user - wrong images for items
      const inventoryItem: InventoryItemOptions = {
        label: {
          titleSelector: '[data-test="inventory-item-name"]',
          titleText: "Sauce Labs Backpack",
          descriptionSelector: '[data-test="inventory-item-desc"]',
          descriptionText:
            "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.", // bug - should be Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
        },
        labelLink: {
          linkSelector: '[data-test="item-4-title-link"]',
          linkHref: "#", // bug - should be https://www.saucedemo.com/inventory-item.html?id=4
        },
        price: {
          priceSelector: '[data-test="inventory-item-price"]',
          priceText: "$29.99",
        },
        image: {
          imgSelector: '[data-test="inventory-item-sauce-labs-backpack-img"]',
          altText: "Sauce Labs Backpack",
          srcValue: "/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg",
        },
        imageLink: {
          linkSelector: '[data-test="item-4-img-link"]',
          linkHref: "#", // bug - should be https://www.saucedemo.com/inventory-item.html?id=4
        },
      };

      const loginPage = new LoginPage(page);
      const buttonComponent = new Button(
        page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      );
      const inventoryItemComponent = new InventoryItem(
        page.locator(".inventory_item")
      );
      const user = getUser(userList.users, type);

      await loginPage.login(user);
      await inventoryItemComponent.checkItem(inventoryItem);
      await buttonComponent.checkAppearance({
        backgroundColor: "rgb(255, 255, 255)",
        borderColor: "rgb(19, 35, 34)",
        text: "Add to cart",
      });
    });
  }
});
