import { checkButton, ButtonOptions } from "../utils/button";
import { checkInputField, InputOptions } from "../utils/input";
import { checkText, TextOptions } from "../utils/text";
import { checkUrl, CustomUrlOptions } from "../utils/customUrl";
import { login, logout, LoginOptions, LogoutOptions } from "../utils/user";
import { checkHeader, HeaderOptions } from "../utils/header";
import { checkInventoryItem, InventoryItem } from "../utils/inventoryItem";
import { checkCartItem, CartItem } from "../utils/cart";

Cypress.Commands.add(
  "checkButton",
  (selector: string, options: ButtonOptions) => {
    return checkButton(selector, options);
  }
);

Cypress.Commands.add(
  "checkInputField",
  (selector: string, options: InputOptions) => {
    return checkInputField(selector, options);
  }
);

Cypress.Commands.add("checkText", (selector: string, options: TextOptions) => {
  return checkText(selector, options);
});

Cypress.Commands.add("checkUrl", (options: CustomUrlOptions) => {
  return checkUrl(options);
});

Cypress.Commands.add("login", (options: LoginOptions) => {
  return login(options);
});

Cypress.Commands.add("logout", (options: LogoutOptions) => {
  return logout(options);
});

Cypress.Commands.add(
  "checkHeader",
  (selector: string, options?: HeaderOptions) => {
    return checkHeader(selector, options);
  }
);

Cypress.Commands.add("checkInventoryItem", (options: InventoryItem) => {
  return checkInventoryItem(options);
});

Cypress.Commands.add("checkCartItem", (options: CartItem) => {
  return checkCartItem(options);
});
