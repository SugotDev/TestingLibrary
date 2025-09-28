import { eq } from "cypress/types/lodash";

export interface InventoryItem {
  label: InventoryItemLabelOptions;
  labelLink: InventoryItemLinkOptions;
  price: InventoryItemPriceOptions;
  button: InventoryItemButtonOptions;
  image: InventoryItemImageOptions;
  imageLink: InventoryItemLinkOptions;
  itemNumber?: number;
}
export interface InventoryItemButtonOptions {
  buttonSelector: string;
  buttonText: string;
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

export const checkInventoryItem = (options: InventoryItem) => {
  const {
    label: { titleSelector, titleText, descriptionSelector, descriptionText },
    labelLink: { linkSelector: labelLinkSelector, linkHref: labelLinkHref },
    price: { priceSelector, priceText },
    button: { buttonSelector, buttonText },
    image: { imgSelector, altText, srcValue },
    imageLink: { linkSelector: imgLinkSelector, linkHref: imgLinkHref },
    itemNumber = 0,
  } = options;

  cy.get('[data-test="inventory-item"]')
    .eq(itemNumber)
    .within(() => {
      cy.get(titleSelector).should("be.visible").should("have.text", titleText);
      cy.get(descriptionSelector)
        .should("be.visible")
        .should("have.text", descriptionText);
      cy.get(labelLinkSelector)
        .should("be.visible")
        .should("have.attr", "href", labelLinkHref);
      cy.get(priceSelector).should("be.visible").should("have.text", priceText);
      cy.get(buttonSelector)
        .should("be.visible")
        .should("have.text", buttonText);
      cy.get(imgSelector)
        .should("be.visible")
        .should("have.attr", "alt", altText)
        .should("have.attr", "src", srcValue);
      cy.get(imgLinkSelector)
        .should("be.visible")
        .should("have.attr", "href", imgLinkHref);
    });
};
