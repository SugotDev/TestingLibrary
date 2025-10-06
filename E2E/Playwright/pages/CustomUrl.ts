import { Page, expect } from "@playwright/test";

export interface CustomUrlOptions {
  shouldContain?: RegExp | string;
  shouldEqual?: string;
}

export class CustomUrl {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkUrl(options: CustomUrlOptions = {}) {
    const { shouldContain, shouldEqual } = options;

    if (shouldEqual) {
      await expect(this.page).toHaveURL(shouldEqual);
    }

    if (shouldContain) {
      await expect(this.page).toHaveURL(shouldContain);
    }
  }
}
