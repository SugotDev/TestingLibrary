import pets from "../../../fixtures/pets.json";

beforeEach(() => {
  cy.request("POST", "http://localhost:3001/reset");
});

describe("POSITIVE - API Validation: /pets", () => {
  const endpointName = "/pets";

  it("POST /pets - should create a new record", () => {
    cy.api({
      method: "POST",
      url: endpointName,
      body: pets.nemo,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id", pets.nemo.id);
    });
  });

  it("PUT /pets/:id - should update status in existing record", () => {
    cy.api({
      method: "PUT",
      url: `/pets/${pets.rex.id}`,
      body: { ...pets.rex, status: "sold" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("status", "sold");
    });
  });

  it("GET /pets - should return list of all pets", () => {
    cy.api({
      method: "GET",
      url: endpointName,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).length.gt(0);
    });
  });

  it("GET /pets/:id - should return one pet", () => {
    cy.api({
      method: "GET",
      url: `${endpointName}/${1}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", pets.rex.id);
    });
  });

  it("DELETE /pets/:id - should return one pet", () => {
    cy.api({
      method: "DELETE",
      url: `${endpointName}/${1}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
