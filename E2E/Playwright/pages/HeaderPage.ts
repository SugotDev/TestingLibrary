import { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export interface HeaderOptions {
  background?: string;
  backgroundColor?: string;
  height?: string;
  logoSelector?: string;
  logoAltText?: string;
  text?: string;
}
export class HeaderPage {
  readonly page: Page;
  readonly header: Locator;

  constructor(page: Page, selector: string = "header") {
    this.page = page;
    this.header = page.locator(selector);
  }

  async checkHeader(options?: HeaderOptions) {
    const {
      background,
      backgroundColor,
      height,
      logoSelector,
      logoAltText,
      text,
    } = options || {};
    await expect(this.header).toBeVisible();
    if (background) {
      await expect(this.header).toHaveCSS("background", background);
    }
    if (backgroundColor) {
      await expect(this.header).toHaveCSS("background-color", backgroundColor);
    }
    if (height) {
      await expect(this.header).toHaveCSS("height", height);
    }
    if (logoSelector && logoAltText) {
      const logo = this.page.locator(logoSelector);
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute("alt", logoAltText);
    }
    if (text) {
      await expect(this.header).toContainText(text);
    }
  }
}
