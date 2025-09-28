import { InventoryItem } from "../../utils/inventoryItem";
import type { User } from "../../utils/user";

let users: User[];
let filteredUsers: User[];
beforeEach(() => {
  users = Cypress.env("users");
  filteredUsers = users.filter((user) => user.type !== "locked_out_user");
});

afterEach(() => {
  cy.logout({
    menuSelector: "#react-burger-menu-btn",
    buttonSelector: "#logout_sidebar_link",
  });
});

describe("Check main page for multiple users", () => {
  it("logs in as each user and checks headers", () => {
    filteredUsers.forEach((user) => {
      cy.login({ username: user.username, password: user.password });
      cy.checkHeader(".header_label", {
        background:
          "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box",
        height: "48px",
        logoSelector: ".app_logo",
        text: "Swag Labs",
      });
      cy.checkHeader('[data-test="secondary-header"]', {
        background:
          "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box",
        height: "56px",
        text: "Products",
      });
    });
  });
  it.only("logs in as each user and checks product cards", () => {
    // bug with problem_user - images are all the same
    // bug with visual_user - wrong images for items
    const inventoryItem: InventoryItem = {
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
    filteredUsers.forEach((user) => {
      cy.login({ username: user.username, password: user.password });
      cy.checkInventoryItem(inventoryItem);
      cy.checkButton('[data-test="add-to-cart-sauce-labs-backpack"]', {
        backgroundColor: "rgb(255, 255, 255)",
        borderColor: "rgb(19, 35, 34)",
        text: "Add to cart",
        clickable: false,
      });
    });
  });
});
