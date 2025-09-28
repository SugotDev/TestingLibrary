export interface HeaderOptions {
  background?: string;
  backgroundColor?: string;
  height?: string;
  logoSelector?: string;
  logoAltText?: string;
  text?: string;
}

export const checkHeader = (selector: string, options?: HeaderOptions) => {
  const {
    background,
    backgroundColor,
    height,
    logoSelector,
    logoAltText,
    text,
  } = options || {};

  const header = cy.get(selector).should("be.visible");

  if (background) {
    header.should("have.css", "background", background);
  }
  if (backgroundColor) {
    header.should("have.css", "background", backgroundColor);
  }
  if (height) {
    header.should("have.css", "height", height);
  }
  if (logoSelector && logoAltText) {
    cy.get(logoSelector)
      .should("be.visible")
      .and("have.attr", "alt", logoAltText);
  }
  if (text) {
    header.should("contain.text", text);
  }
};
