import { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export interface InputOptions {
  backgroundColor?: string;
  borderColor?: string;
  placeholder?: string;
  value?: string;
}

export class Input {
  readonly input: Locator;
  constructor(input: Locator) {
    this.input = input;
  }
  async checkInputField(options: InputOptions = {}) {
    const { backgroundColor, borderColor, placeholder, value } = options;
    await expect(this.input).toBeVisible();
    if (backgroundColor) {
      await expect(this.input).toHaveCSS("background-color", backgroundColor);
    }
    if (borderColor) {
      await expect(this.input).toHaveCSS("border-color", borderColor);
    }
    if (placeholder) {
      await expect(this.input).toHaveAttribute("placeholder", placeholder);
    }
    if (value) {
      await this.input.fill(value);
      await expect(this.input).toHaveValue(value);
    }
  }
}
