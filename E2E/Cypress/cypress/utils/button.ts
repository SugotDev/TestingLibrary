export interface ButtonOptions {
  backgroundColor?: string;
  borderColor?: string;
  text?: string;
  clickable?: boolean;
}

export const checkButton = (selector: string, options: ButtonOptions = {}) => {
  const { backgroundColor, borderColor, text, clickable = true } = options;

  cy.get(selector).should("be.visible");

  if (backgroundColor) {
    cy.get(selector).should("have.css", "background-color", backgroundColor);
  }

  if (borderColor) {
    cy.get(selector).should("have.css", "border-color", borderColor);
  }

  if (text) {
    cy.get(selector).should("have.text", text);
  }

  if (clickable) {
    cy.get(selector).click();
  }
};
