import { Locator } from "@playwright/test";
import { expect } from "@playwright/test";
export interface ButtonCheckOptions {
  backgroundColor?: string;
  borderColor?: string;
  text?: string;
}
export class Button {
  readonly button: Locator;
  constructor(button: Locator) {
    this.button = button;
  }

  async checkAppearance(options: ButtonCheckOptions = {}) {
    const { backgroundColor, borderColor, text } = options;
    await expect(this.button).toBeVisible();

    if (backgroundColor) {
      const bgColor = await this.button.evaluate(
        (el) => getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBe(backgroundColor);
    }
    if (borderColor) {
      const bColor = await this.button.evaluate(
        (el) => getComputedStyle(el).borderColor
      );
      expect(bColor).toBe(borderColor);
    }
    if (text) {
      const buttonText = await this.button.textContent();
      expect(buttonText).toBe(text);
    }
  }
  async click() {
    await this.button.click();
  }
}
