export interface LoginOptions {
  username: string;
  password: string;
  assertSuccess?: boolean;
}

export interface LogoutOptions {
  menuSelector: string;
  buttonSelector: string;
  assertSuccess?: boolean;
}
export interface User {
  type: string;
  username: string;
  password: string;
}

export function getUser(users: User[], type: string): LoginOptions {
  const user = users.find((u) => u.type === type);
  if (!user) throw new Error(`User type ${type} not found`);
  return user as LoginOptions;
}
export const login = (options: LoginOptions) => {
  const { username, password, assertSuccess = true } = options;

  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();

  if (assertSuccess) {
    cy.url().should("include", "/inventory.html");
  } else {
    cy.url().should("equal", Cypress.env("baseUrl"));
    cy.get('[data-test="error"]')
      .should("be.visible")
      .should(
        "have.text",
        "Epic sadface: Sorry, this user has been locked out."
      );
  }
};

export const logout = (options: LogoutOptions) => {
  const { menuSelector, buttonSelector, assertSuccess = true } = options;

  cy.get(menuSelector).click();
  cy.get(buttonSelector).click();
  if (assertSuccess) {
    cy.url().should("equal", Cypress.env("baseUrl"));
  } else {
    cy.url().should("not.equal", Cypress.env("baseUrl"));
  }
};
