export interface InventoryItem {
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

export const checkInventoryItem = (options: InventoryItem) => {
  const {
    label: { titleSelector, titleText, descriptionSelector, descriptionText },
    labelLink: { linkSelector: labelLinkSelector, linkHref: labelLinkHref },
    price: { priceSelector, priceText },
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
      cy.get(imgSelector)
        .should("be.visible")
        .should("have.attr", "alt", altText)
        .should("have.attr", "src", srcValue);
      cy.get(imgLinkSelector)
        .should("be.visible")
        .should("have.attr", "href", imgLinkHref);
    });
};
