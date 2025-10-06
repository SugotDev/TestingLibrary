import { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export interface InventoryItemOptions {
  label: InventoryItemLabelOptions;
  labelLink: InventoryItemLinkOptions;
  price: InventoryItemPriceOptions;
  image: InventoryItemImageOptions;
  imageLink: InventoryItemLinkOptions;
  itemNumber?: number;
}
export interface InventoryItemPriceOptions {
  priceSelector: string;
  priceText: string;
}
export interface InventoryItemLabelOptions {
  titleSelector: string;
  titleText: string;
  descriptionSelector: string;
  descriptionText: string;
}
export interface InventoryItemImageOptions {
  imgSelector: string;
  altText: string;
  srcValue: string;
}
export interface InventoryItemLinkOptions {
  linkSelector: string;
  linkHref: string;
}

export class InventoryItem {
  readonly item: Locator;
  constructor(item: Locator) {
    this.item = item;
  }
  async checkItem(options: InventoryItemOptions) {
    const {
      label: { titleSelector, titleText, descriptionSelector, descriptionText },
      labelLink: { linkSelector: labelLinkSelector, linkHref: labelLinkHref },
      price: { priceSelector, priceText },
      image: { imgSelector, altText, srcValue },
      imageLink: { linkSelector: imgLinkSelector, linkHref: imgLinkHref },
      itemNumber = 0,
    } = options;

    const inventoryItems = this.item;
    const inventoryItem = inventoryItems.nth(itemNumber);

    const title = inventoryItem.locator(titleSelector);
    await expect(title).toBeVisible();
    await expect(title).toHaveText(titleText);

    const description = inventoryItem.locator(descriptionSelector);
    await expect(description).toBeVisible();
    await expect(description).toHaveText(descriptionText);

    const labelLink = inventoryItem.locator(labelLinkSelector);
    await expect(labelLink).toBeVisible();
    await expect(labelLink).toHaveAttribute("href", labelLinkHref);

    const price = inventoryItem.locator(priceSelector);
    await expect(price).toBeVisible();
    await expect(price).toHaveText(priceText);

    const img = inventoryItem.locator(imgSelector);
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute("alt", altText);
    await expect(img).toHaveAttribute("src", srcValue);

    const imgLink = inventoryItem.locator(imgLinkSelector);
    await expect(imgLink).toBeVisible();
    await expect(imgLink).toHaveAttribute("href", imgLinkHref);
  }
}
