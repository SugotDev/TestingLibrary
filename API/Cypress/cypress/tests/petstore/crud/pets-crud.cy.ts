import pets from "../../../fixtures/pets.json";

beforeEach(() => {
  cy.request("POST", "http://localhost:3001/reset");
});

describe("Create, read, update, delete", () => {
  const endpointName = "/pets";

  it("Check pet endpoints", () => {
    cy.api({
      method: "POST",
      url: endpointName,
      body: pets.nemo,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id", pets.nemo.id);
    });
    cy.api({
      method: "GET",
      url: `/pets/${pets.nemo.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", pets.nemo.name);
    });
    cy.api({
      method: "PUT",
      url: `/pets/${pets.nemo.id}`,
      body: { ...pets.nemo, name: "Max" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "Max");
    });
    cy.api({
      method: "GET",
      url: `/pets/${pets.nemo.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "Max");
    });
    cy.api({
      method: "DELETE",
      url: `/pets/${pets.nemo.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.api({
      method: "GET",
      url: `/pets/${pets.nemo.id}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
