const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/reset", (req, res) => {
  router.db
    .set("pets", [
      {
        id: "1",
        category: {
          id: 1,
          name: "dog",
        },
        name: "Rex",
        photoUrls: [
          "https://example.com/photos/rex1.jpg",
          "https://example.com/photos/rex2.jpg",
        ],
        tags: [
          {
            id: 1,
            name: "friendly",
          },
          {
            id: 2,
            name: "trained",
          },
        ],
        status: "available",
      },
      {
        id: "2",
        category: {
          id: 2,
          name: "cat",
        },
        name: "Garfield",
        photoUrls: ["https://example.com/photos/garfield1.jpg"],
        tags: [
          {
            id: 3,
            name: "lazy",
          },
          {
            id: 4,
            name: "funny",
          },
        ],
        status: "available",
      },
    ])
    .write();
  res.status(200).json({ message: "Database reset" });
});

server.post("/pets", (req, res) => {
  const pet = req.body;
  const db = router.db;

  if (!pet.id) {
    return res.status(400).json({ error: "Pet id is required" });
  }
  if (!pet.category || !pet.category.id || !pet.category.name) {
    return res
      .status(400)
      .json({ error: "Pet category with id and name is required" });
  }
  if (!pet.name || pet.name.trim() === "") {
    return res.status(400).json({ error: "Pet name is required" });
  }
  if (!Array.isArray(pet.photoUrls) || pet.photoUrls.length === 0) {
    return res
      .status(400)
      .json({ error: "Pet photoUrls must be a non-empty array" });
  }
  if (!Array.isArray(pet.tags) || pet.tags.length === 0) {
    return res
      .status(400)
      .json({ error: "Pet tags must be a non-empty array" });
  } else {
    for (const tag of pet.tags) {
      if (!tag.id || !tag.name) {
        return res
          .status(400)
          .json({ error: "Each tag must have id and name" });
      }
    }
  }
  if (!pet.status || !["available", "pending", "sold"].includes(pet.status)) {
    return res
      .status(400)
      .json({ error: "Pet status must be one of available, pending, sold" });
  }

  const existingPet = db.get("pets").find({ id: pet.id }).value();
  if (existingPet) {
    return res
      .status(409)
      .json({ error: `Pet with id ${pet.id} already exists` });
  }

  db.get("pets").push(pet).write();

  res.status(201).json(pet);
});

server.put("/pets/:id", (req, res) => {
  const petId = req.params.id;
  const updatedPet = req.body;
  const db = router.db;

  const existingPet = db.get("pets").find({ id: petId }).value();
  if (!existingPet) {
    return res.status(404).json({ error: "Not found" });
  }

  if (!updatedPet.id) {
    return res.status(400).json({ error: "Pet id is required" });
  }
  if (
    !updatedPet.category ||
    !updatedPet.category.id ||
    !updatedPet.category.name
  ) {
    return res
      .status(400)
      .json({ error: "Pet category with id and name is required" });
  }
  if (!updatedPet.name || updatedPet.name.trim() === "") {
    return res.status(400).json({ error: "Pet name is required" });
  }
  if (
    !Array.isArray(updatedPet.photoUrls) ||
    updatedPet.photoUrls.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Pet photoUrls must be a non-empty array" });
  }
  if (!Array.isArray(updatedPet.tags) || updatedPet.tags.length === 0) {
    return res
      .status(400)
      .json({ error: "Pet tags must be a non-empty array" });
  } else {
    for (const tag of updatedPet.tags) {
      if (!tag.id || !tag.name) {
        return res
          .status(400)
          .json({ error: "Each tag must have id and name" });
      }
    }
  }
  if (
    !updatedPet.status ||
    !["available", "pending", "sold"].includes(updatedPet.status.trim())
  ) {
    return res.status(400).json({
      error: "Pet status must be one of available, pending, sold",
    });
  }

  db.get("pets").find({ id: petId }).assign(updatedPet).write();

  return res.status(200).json(updatedPet);
});

server.use(router);
server.listen(3001, () => {
  console.log("✅ JSON Server running at http://localhost:3001");
});
