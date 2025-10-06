import { Locator } from "@playwright/test";
import { expect } from "@playwright/test";

export interface TextOptions {
  content?: string;
  fontSize?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}
export class Text {
  readonly text: Locator;
  constructor(text: Locator) {
    this.text = text;
  }
  async checkText(options: TextOptions = {}) {
    const { content, fontSize, color, bold, italic, underline } = options;
    await expect(this.text).toBeVisible();
    if (content) {
      await expect(this.text).toHaveText(content);
    }
    if (fontSize) {
      await expect(this.text).toHaveCSS("font-size", fontSize);
    }
    if (color) {
      await expect(this.text).toHaveCSS("color", color);
    }
    if (bold) {
      await expect(this.text).toHaveCSS("font-weight", /^(700|bold)$/);
    }
    if (italic) {
      await expect(this.text).toHaveCSS("font-style", "italic");
    }
    if (underline) {
      await expect(this.text).toHaveCSS("text-decoration-line", "underline");
    }
  }
}
