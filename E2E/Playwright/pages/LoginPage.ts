import { Page, Locator } from "@playwright/test";
import { LoginOptions } from "../types/User";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async login(options: LoginOptions) {
    const { username, password } = options;
    await this.usernameInput.type(username);
    await this.passwordInput.type(password);
    await this.loginButton.click();
  }
  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }
}
