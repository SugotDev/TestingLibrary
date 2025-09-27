/// <reference types="cypress" />

import { CheckButtonOptions } from "../utils/button";
import { InputOptions } from "../utils/input";
import { TextOptions } from "../utils/text";
import { CustomUrlOptions } from "../utils/url";
import { LoginOptions, LogoutOptions } from "../utils/user";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to check a button's style and optionally click it
       * @example cy.checkButton(selector, { backgroundColor, borderColor, text, clickable })
       */
      checkButton(
        selector: string,
        options?: CheckButtonOptions
      ): Chainable<void>;

      /**
       * Custom command to check a input's style and optionally type value
       * @example cy.checkInputField(selector, { backgroundColor, borderColor, placeholder, value })
       */
      checkInputField(
        selector: string,
        options?: InputOptions
      ): Chainable<void>;

      /**
       * Custom command to check a text's style and content
       * @example cy.checkText(selector, { content, fontSize, color, bold, italic, underline })
       */

      checkText(selector: string, options?: TextOptions): Chainable<void>;

      /**
       * Custom command to check the current URL
       * @example cy.checkUrl({ shouldContain, shouldEqual })
       */
      checkUrl(options?: CustomUrlOptions): Chainable<void>;

      /**
       * Custom command to log in a user
       * @example cy.login( { username, password, assertSuccess })
       */
      login(options: LoginOptions): Chainable<void>;

      /**
       * Custom command to log out a user
       * @example cy.logout({ menuSelector, buttonSelector, assertSuccess })
       */
      logout(options: LogoutOptions): Chainable<void>;
    }
  }
}
