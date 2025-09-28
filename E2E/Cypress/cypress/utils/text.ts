export interface TextOptions {
  content?: string;
  fontSize?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export const checkText = (selector: string, options: TextOptions = {}) => {
  const { content, fontSize, color, bold, italic, underline } = options;
  cy.get(selector).should("be.visible");
  if (content) {
    cy.get(selector).should("have.text", content);
  }
  if (fontSize) {
    cy.get(selector).should("have.css", "font-size", fontSize);
  }
  if (color) {
    cy.get(selector).should("have.css", "color", color);
  }
  if (bold) {
    cy.get(selector).should("have.css", "font-weight", "700");
  }
  if (italic) {
    cy.get(selector).should("have.css", "font-style", "italic");
  }
  if (underline) {
    cy.get(selector).should("have.css", "text-decoration-line", "underline");
  }
};
