export interface CustomUrlOptions {
  shouldContain?: string;
  shouldEqual?: string;
}

export const checkUrl = (options: CustomUrlOptions = {}) => {
  const { shouldContain, shouldEqual } = options;
  cy.url().should("be.visible");
  if (shouldContain) {
    cy.url().should("contain", shouldContain);
  }
  if (shouldEqual) {
    cy.url().should("eq", shouldEqual);
  }
};
