import pets from "../../../fixtures/pets.json";

beforeEach(() => {
  cy.request("POST", "http://localhost:3001/reset");
});

describe("NEGATIVE - API Validation: /pets", () => {
  const endpointName = "/pets";
  const nonExistingId = 123;

  it("POST /pets - should return 400 when body is missing", () => {
    cy.api({
      method: "POST",
      url: endpointName,
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.contain("Pet id is required");
    });
  });

  it("POST /pets - should return 400 when name is empty string", () => {
    cy.api({
      method: "POST",
      url: endpointName,
      body: {
        id: "3",
        category: { id: 3, name: "fish" },
        name: " ",
        photoUrls: ["https://example.com/photos/nemo1.jpg"],
        tags: [
          {
            id: 5,
            name: "colorful",
          },
        ],
        status: "available",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.contain("Pet name is required");
    });
  });

  it("POST /pets - should return 409 when pet with same id already exists", () => {
    cy.api({
      method: "POST",
      url: endpointName,
      body: pets.rex,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.error).to.contain("already exists");
    });
  });

  it("PUT /pets/:id - should return 400 when body is missing", () => {
    cy.api({
      method: "PUT",
      url: `/${endpointName}/${pets.rex.id}`,
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.contain("Pet id is required");
    });
  });

  it("PUT /pets/:id - should return 400 when status is empty string", () => {
    cy.api({
      method: "PUT",
      url: `/${endpointName}/${pets.rex.id}`,
      body: { ...pets.rex, status: " " },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.contain(
        "Pet status must be one of available, pending, sold"
      );
    });
  });

  it("PUT /pets/:id - should return 404 for non-existent ID", () => {
    cy.api({
      method: "PUT",
      url: `/${endpointName}/123`,
      body: { ...pets.rex, status: "sold" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.error).to.contain("Not found");
    });
  });

  it("GET /pets/:id - should return 404 for non-existent ID", () => {
    cy.api({
      method: "GET",
      url: `${endpointName}/${nonExistingId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.statusText).to.eq("Not Found");
    });
  });

  it("DELETE /pets/:id - should return 404 for non-existent ID ", () => {
    cy.api({
      method: "DELETE",
      url: `${endpointName}/${nonExistingId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.statusText).to.eq("Not Found");
    });
  });
});
