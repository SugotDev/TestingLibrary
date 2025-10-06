import {
  InventoryItemLabelOptions,
  InventoryItemLinkOptions,
  InventoryItemPriceOptions,
} from "./inventoryItem";

export interface CartItemOptions {
  quantitySelector: string;
  quantity: number;
  label: InventoryItemLabelOptions;
  labelLink: InventoryItemLinkOptions;
  price: InventoryItemPriceOptions;
  itemNumber?: number;
}

export const checkCartItem = (options: CartItemOptions) => {
  const {
    quantitySelector,
    quantity,
    label: { titleSelector, titleText, descriptionSelector, descriptionText },
    labelLink: { linkSelector: labelLinkSelector, linkHref: labelLinkHref },
    price: { priceSelector, priceText },
    itemNumber = 0,
  } = options;

  cy.get('[data-test="inventory-item"]')
    .eq(itemNumber)
    .within(() => {
      cy.get(quantitySelector)
        .should("be.visible")
        .should("have.text", quantity.toString());
      cy.get(titleSelector).should("be.visible").should("have.text", titleText);
      cy.get(descriptionSelector)
        .should("be.visible")
        .should("have.text", descriptionText);
      cy.get(labelLinkSelector)
        .should("be.visible")
        .should("have.attr", "href", labelLinkHref);
      cy.get(priceSelector).should("be.visible").should("have.text", priceText);
    });
};
