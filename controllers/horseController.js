const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const db = require("../db/queries");

const validateHorse = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage("Name must be 2 to 15 characters"),
  body("breed_id")
    .isInt({ min: 1 })
    .withMessage("Breed is required and must be a valid ID"),
  body("age")
    .isInt({ min: 3, max: 50 })
    .withMessage("Age must be between 3 and 50"),
  body("rider_id")
    .isInt({ min: 1 })
    .withMessage("Rider is required and must be a valid ID"),
  body("image_url").isURL().withMessage("Image URL must be a valid URL"),
];

const getAllHorses = asyncHandler(async (req, res) => {
  const horses = await db.getAllHorses();

  if (!horses) {
    throw new CustomNotFoundError("No horses found");
  }
  res.render("index", { title: "Perfect Stable", horses });
});

const filterHorses = asyncHandler(async (req, res) => {
  const { type, id } = req.params;

  const validTypes = {
    breeds: "breed",
    riders: "rider",
  };

  const column = validTypes[type];

  if (!column) {
    return res.status(400).send("Invalid filter type");
  }

  const horses = await db.filterHorsesBy(column, id);

  if (!horses || horses.length === 0) {
    return res.status(404).send("No horses found");
  }

  const titleValue = horses[0][column];

  res.render("filtered", {
    title: `Filtered by: ${titleValue}`,
    horses,
  });
});

const deleteHorse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const horse = await db.getHorseById(id);
  if (!horse) {
    return res.status(404).send("Horse not found");
  }

  if (horse.admin_created) {
    return res.render("horses/confirm-delete", { horse });
  } else {
    await db.deleteHorse(id);
    return res.redirect("/");
  }
});

const confirmDeleteHorse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { passcode } = req.body;

  const horse = await db.getHorseById(id);
  if (!horse) {
    return res.status(404).send("Horse not found");
  }

  const correctPasscode = process.env.ADMIN_PASSCODE;
  if (!passcode || passcode !== correctPasscode) {
    return res.status(403).send("Invalid passcode");
  }

  await db.deleteHorse(id);
  res.redirect("/");
});

const addHorse = [
  ...validateHorse,
  async (req, res) => {
    console.log("Received form data:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, breed_id, age, rider_id, image_url } = req.body;

    await db.addHorse(
      name,
      parseInt(breed_id, 10),
      parseInt(age, 10),
      parseInt(rider_id, 10),
      image_url
    );

    res.redirect("/");
  },
];

const editHorse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const horse = await db.getHorseById(id);
  if (!horse) {
    return res.status(404).send("Horse not found");
  }

  res.render("horses/form", { title: "Edit Horse", horse });
});

const confirmEditHorse = [
  ...validateHorse,
  async (req, res) => {
    console.log("Received form data:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name, breed_id, age, rider_id, image_url, passcode } = req.body;

      const horse = await db.getHorseById(id);
    if (!horse) {
      return res.status(404).send("Horse not found");
    }

    if (horse.admin_created) {
      const correctPasscode = process.env.ADMIN_PASSCODE;
      if (!passcode || passcode !== correctPasscode) {
        return res.status(403).send("Invalid passcode");
      }
    }

    await db.editHorse(
      id,
      name,
      parseInt(breed_id, 10),
      parseInt(age, 10),
      parseInt(rider_id, 10),
      image_url
    );

    res.redirect("/");
  },
];

module.exports = {
  getAllHorses,
  filterHorses,
  deleteHorse,
  confirmDeleteHorse,
  addHorse,
  editHorse,
  confirmEditHorse
};
