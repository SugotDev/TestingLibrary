import { LoginOptions } from "../../utils/user";

beforeEach(() => {
  cy.visit("/");
});

afterEach(() => {
  if (Cypress.currentTest.title !== "fail logs in a locked out user") {
    cy.logout({
      menuSelector: "#react-burger-menu-btn",
      buttonSelector: "#logout_sidebar_link",
    });
  }
});

describe("Login/Logout functionality for multiple users", () => {
  it("logs in and logs out a standard user successfully", () => {
    const standardUser = Cypress.env("standard_user") as LoginOptions;
    cy.login({ ...standardUser });
  });
  it("logs in and logs out a problem user successfully", () => {
    const problemUser = Cypress.env("problem_user") as LoginOptions;
    cy.login({ ...problemUser });
  });
  it("logs in and logs out a visual user successfully", () => {
    const visualUser = Cypress.env("visual_user") as LoginOptions;
    cy.login({ ...visualUser });
  });
  it("logs in and logs out a performance glitch user successfully", () => {
    const performanceGlitchUser = Cypress.env(
      "performance_glitch_user"
    ) as LoginOptions;
    cy.login({ ...performanceGlitchUser });
  });
  it("logs in and logs out a error user", () => {
    const errorUser = Cypress.env("error_user") as LoginOptions;
    cy.login({ ...errorUser });
  });
  it("fail logs in a locked out user", () => {
    const lockedOutUser = Cypress.env("locked_out_user") as LoginOptions;
    cy.login({ ...lockedOutUser, assertSuccess: false });
  });
});
