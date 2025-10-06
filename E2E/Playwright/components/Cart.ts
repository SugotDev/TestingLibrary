import { expect, Locator } from "@playwright/test";
import {
  InventoryItemLabelOptions,
  InventoryItemLinkOptions,
  InventoryItemPriceOptions,
} from "./InventoryItem";

export interface CartItemOptions {
  quantitySelector: string;
  quantity: number;
  label: InventoryItemLabelOptions;
  labelLink: InventoryItemLinkOptions;
  price: InventoryItemPriceOptions;
  itemNumber?: number;
}

export class CartItem {
  readonly item: Locator;
  constructor(item: Locator) {
    this.item = item;
  }
  async checkCartItem(options: CartItemOptions) {
    const {
      quantitySelector,
      quantity,
      label: { titleSelector, titleText, descriptionSelector, descriptionText },
      labelLink: { linkSelector: labelLinkSelector, linkHref: labelLinkHref },
      price: { priceSelector, priceText },
      itemNumber = 0,
    } = options;
    const cartItem = this.item.nth(itemNumber);

    const quantityLocator = cartItem.locator(quantitySelector);
    await expect(quantityLocator).toBeVisible();
    await expect(quantityLocator).toHaveText(quantity.toString());

    const title = cartItem.locator(titleSelector);
    await expect(title).toBeVisible();
    await expect(title).toHaveText(titleText);

    const description = cartItem.locator(descriptionSelector);
    await expect(description).toBeVisible();
    await expect(description).toHaveText(descriptionText);

    const labelLink = cartItem.locator(labelLinkSelector);
    await expect(labelLink).toBeVisible();
    await expect(labelLink).toHaveAttribute("href", labelLinkHref);

    const price = cartItem.locator(priceSelector);
    await expect(price).toBeVisible();
    await expect(price).toHaveText(priceText);
  }
}
