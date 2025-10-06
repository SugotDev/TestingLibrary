import { getUser } from "../../utils/user";
import type { User } from "../../utils/user";

let users: User[];

beforeEach(() => {
  users = Cypress.env("users");
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
    const standardUser = getUser(users, "standard_user");
    cy.login(standardUser);
  });
  it("logs in and logs out a problem user successfully", () => {
    const problemUser = getUser(users, "problem_user");
    cy.login(problemUser);
  });
  it("logs in and logs out a visual user successfully", () => {
    const visualUser = getUser(users, "visual_user");
    cy.login(visualUser);
  });
  it("logs in and logs out a performance glitch user successfully", () => {
    const performanceGlitchUser = getUser(users, "performance_glitch_user");
    cy.login(performanceGlitchUser);
  });
  it("logs in and logs out a error user", () => {
    const errorUser = getUser(users, "error_user");
    cy.login(errorUser);
  });
  it("fail logs in a locked out user", () => {
    const lockedOutUser = getUser(users, "locked_out_user");
    cy.login({ ...lockedOutUser, assertSuccess: false });
  });
});
