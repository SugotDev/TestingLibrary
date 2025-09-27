export interface InputOptions {
  backgroundColor?: string;
  borderColor?: string;
  placeholder?: string;
  value?: string;
}

export const checkInputField = (
  selector: string,
  options: InputOptions = {}
) => {
  const { backgroundColor, borderColor, placeholder, value } = options;

  cy.get(selector).should("be.visible");

  if (backgroundColor) {
    cy.get(selector).should("have.css", "background-color", backgroundColor);
  }

  if (borderColor) {
    cy.get(selector).should("have.css", "border-color", borderColor);
  }
  if (placeholder) {
    cy.get(selector).should("have.attr", "placeholder", placeholder);
  }
  if (value) {
    cy.get(selector).type(value).should("have.value", value);
  }
};
