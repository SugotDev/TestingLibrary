import type { User } from "../../utils/user";

let users: User[];
let standardUser: User;
beforeEach(() => {
  users = Cypress.env("users");
  standardUser = users.find((user) => user.type === "standard_user");
});

describe("Check add to cart functionality for standard user", () => {
  it("logs in as each user, adds an item to the cart, and verifies the cart count", () => {
    cy.login({
      username: standardUser.username,
      password: standardUser.password,
    });
    cy.checkButton('[data-test="add-to-cart-sauce-labs-backpack"]', {
      clickable: true,
    });
    cy.checkButton('[data-test="add-to-cart-sauce-labs-bike-light"]', {
      clickable: true,
    });
    cy.checkText('[data-test="shopping-cart-badge"]', { content: "2" });
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.checkCartItem({
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
    cy.checkButton('[data-test="remove-sauce-labs-backpack"]', {
      backgroundColor: "rgb(255, 255, 255)",
      borderColor: "rgb(226, 35, 26)",
      text: "Remove",
      clickable: false,
    });
    cy.checkCartItem({
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
    cy.checkButton('[data-test="remove-sauce-labs-bike-light"]', {
      backgroundColor: "rgb(255, 255, 255)",
      borderColor: "rgb(226, 35, 26)",
      text: "Remove",
      clickable: false,
    });
  });
});
