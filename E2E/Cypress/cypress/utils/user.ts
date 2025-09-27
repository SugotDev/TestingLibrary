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

export const login = (options: LoginOptions) => {
  const { username, password, assertSuccess = true } = options;

  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();

  if (assertSuccess) {
    cy.url().should("include", "/inventory.html");
  }
};

export const logout = (options: LogoutOptions) => {
  const { menuSelector, buttonSelector, assertSuccess = true } = options;

  cy.get(menuSelector).click();
  cy.get(buttonSelector).click();
  if (assertSuccess) {
    cy.url().should("include", "/");
  }
};
