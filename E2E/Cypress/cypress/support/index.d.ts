/// <reference types="cypress" />

import { CheckButtonOptions } from "../utils/button";
import { InputOptions } from "../utils/input";
import { TextOptions } from "../utils/text";
import { CustomUrlOptions } from "../utils/url";
import { LoginOptions, LogoutOptions } from "../utils/user";
import { HeaderOptions } from "../utils/header";
import { InventoryItem } from "../utils/inventoryItem";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to check a button's style and optionally click it
       * @example cy.checkButton(selector, { backgroundColor, borderColor, text, clickable })
       * @param selector - The selector for the button element
       * @param backgroundColor - Expected background-color CSS property value
       * @param borderColor - Expected border-color CSS property value
       * @param text - Expected text content of the button
       * @param clickable - Whether the button should be clickable (default: true)
       */
      checkButton(
        selector: string,
        options?: CheckButtonOptions
      ): Chainable<void>;

      /**
       * Custom command to check a input's style and optionally type value
       * @example cy.checkInputField(selector, { backgroundColor, borderColor, placeholder, value })
       * @param selector - The selector for the input element
       * @param backgroundColor - Expected background-color CSS property value
       * @param borderColor - Expected border-color CSS property value
       * @param placeholder - Expected placeholder attribute value
       * @param value - Value to type into the input field (if provided)
       */
      checkInputField(
        selector: string,
        options?: InputOptions
      ): Chainable<void>;

      /**
       * Custom command to check a text's style and content
       * @example cy.checkText(selector, { content, fontSize, color, bold, italic, underline })
       * @param selector - The selector for the text element
       * @param content - Expected text content
       * @param fontSize - Expected font-size CSS property value
       * @param color - Expected color CSS property value
       * @param bold - Whether the text should be bold (default: false)
       * @param italic - Whether the text should be italic (default: false)
       * @param underline - Whether the text should be underlined (default: false)
       */

      checkText(selector: string, options?: TextOptions): Chainable<void>;

      /**
       * Custom command to check the current URL
       * @example cy.checkUrl({ shouldContain, shouldEqual })
       * @param shouldContain - Substring that should be contained in the URL
       * @param shouldEqual - Exact string that the URL should equal
       */
      checkUrl(options?: CustomUrlOptions): Chainable<void>;

      /**
       * Custom command to log in a user
       * @example cy.login( { username, password, assertSuccess })
       * @param username - The username of the user
       * @param password - The password of the user
       * @param assertSuccess - Whether to assert that the login was successful (default: true)
       */
      login(options: LoginOptions): Chainable<void>;

      /**
       * Custom command to log out a user
       * @example cy.logout({ menuSelector, buttonSelector, assertSuccess })
       * @param menuSelector - The selector for the menu button to open the logout options
       * @param buttonSelector - The selector for the logout button
       * @param assertSuccess - Whether to assert that the logout was successful (default: true)
       */
      logout(options: LogoutOptions): Chainable<void>;

      /**
       * Custom command to check a header's style and optionally its logo
       * @example cy.checkHeader(selector, { background, backgroundColor, height, logoSelector, logoAltText, text })
       * @param selector - The selector for the header element
       * @param background - Expected background CSS property value
       * @param backgroundColor - Expected background-color CSS property value
       * @param height - Expected height CSS property value
       * @param logoSelector - Optional selector for the logo image within the header
       * @param logoAltText - Expected alt text for the logo image (if logoSelector is provided)
       * @param text - Expected text content of the header
       */
      checkHeader(selector: string, options?: HeaderOptions): Chainable<void>;

      /**
       * Custom command to check an inventory item's details and optionally its button state
       * @example cy.checkInventoryItem({ label, labelLink, price, image, imageLink }
       * @param label - Object containing titleSelector, titleText, descriptionSelector, descriptionText
       * @param labelLink - Object containing linkSelector, linkHref
       * @param price - Object containing priceSelector, priceText
       * @param image - Object containing imgSelector, altText, srcValue
       * @param imageLink - Object containing linkSelector, linkHref
       * @param itemNumber - Optional index of the inventory item to check (default is 0)
       */

      checkInventoryItem(options: InventoryItem): Chainable<void>;

      /**
       * Custom command to check a cart item's details
       * @example cy.checkCartItem({ quantitySelector, quantity, label, labelLink, price, itemNumber })
       * @param quantitySelector - Selector for the quantity element
       * @param quantity - Expected quantity number
       * @param label - Object containing titleSelector, titleText, descriptionSelector, descriptionText
       * @param labelLink - Object containing linkSelector, linkHref
       * @param price - Object containing priceSelector, priceText
       * @param itemNumber - Optional index of the cart item to check (default is 0)
       */
      checkCartItem(options: CartItem): Chainable<void>;
    }
  }
}
