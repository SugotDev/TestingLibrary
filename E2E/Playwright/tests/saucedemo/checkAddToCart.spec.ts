import { test } from "@playwright/test";
import userTypes from "../../data/users.json";
import { LoginPage } from "../../pages/LoginPage";
import { getUser } from "../../utils/userUtils";
import { expect } from "@playwright/test";
import { CartItem } from "../../components/Cart";
import { Button } from "../../components/Button";

test(`logs in as a standard user, adds an item to the cart, and verifies the cart count`, async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  const user = getUser(userTypes.users, "standard_user");
  await loginPage.login(user);
  const addToCartButton = page.locator(
    '[data-test="add-to-cart-sauce-labs-backpack"]'
  );
  await addToCartButton.click();
  const addToCartButton2 = page.locator(
    '[data-test="add-to-cart-sauce-labs-bike-light"]'
  );
  await addToCartButton2.click();
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText("2");
  await page.locator('[data-test="shopping-cart-link"]').click();
  const cartItem = new CartItem(page.locator(".cart_item"));
  cartItem.checkCartItem({
    quantitySelector: ".cart_quantity",
    quantity: 1,
    label: {
      titleSelector: ".inventory_item_name",
      titleText: "Sauce Labs Backpack",
      descriptionSelector: ".inventory_item_desc",
      descriptionText:
        "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    },
    labelLink: {
      linkSelector: '[data-test="item-4-title-link"]',
      linkHref: "#",
    },
    price: {
      priceSelector: '[data-test="inventory-item-price"]',
      priceText: "$29.99",
    },
    itemNumber: 0,
  });
  const removeFromCartButton = new Button(
    page.locator('[data-test="remove-sauce-labs-backpack"]')
  );
  await removeFromCartButton.checkAppearance({
    backgroundColor: "rgb(255, 255, 255)",
    borderColor: "rgb(226, 35, 26)",
    text: "Remove",
  });
  cartItem.checkCartItem({
    quantitySelector: ".cart_quantity",
    quantity: 1,
    label: {
      titleSelector: ".inventory_item_name",
      titleText: "Sauce Labs Bike Light",
      descriptionSelector: ".inventory_item_desc",
      descriptionText:
        "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    },
    labelLink: {
      linkSelector: '[data-test="item-0-title-link"]',
      linkHref: "#",
    },
    price: {
      priceSelector: '[data-test="inventory-item-price"]',
      priceText: "$9.99",
    },
    itemNumber: 1,
  });
  const removeFromCartButton2 = new Button(
    page.locator('[data-test="remove-sauce-labs-bike-light"]')
  );
  await removeFromCartButton2.checkAppearance({
    backgroundColor: "rgb(255, 255, 255)",
    borderColor: "rgb(226, 35, 26)",
    text: "Remove",
  });
});
