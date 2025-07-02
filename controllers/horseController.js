const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries/horse-queries");

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
  body("image_url").isURL().withMessage("Image URL must be a valid URL"),
];

const deleteHorse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { passcode } = req.body;

  const horse = await db.getHorseById(id);
  if (!horse) {
    return res.status(404).send("Horse not found");
  }

  if (horse.admin_created) {
    const correctPasscode = process.env.ADMIN_PASSCODE;
    if (!passcode || passcode !== correctPasscode) {
      return res.status(403).send("Invalid or missing passcode");
    }
  }

  await db.deleteHorse(id);
  return res.redirect("/");
});

const addHorse = [
  ...validateHorse,
  async (req, res) => {
    console.log("Received form data:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, breed_id, age, image_url } = req.body;

    await db.addHorse(
      name,
      parseInt(breed_id, 10),
      parseInt(age, 10),
      image_url
    );

    res.redirect("/");
  },
];

const authEditHorse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { passcode } = req.body;

  const horse = await db.getHorseById(id);
  if (!horse) {
    return res.status(404).send("Horse not found");
  }

  if (!horse.admin_created) {
    return res.render("horses/form", { title: "Edit Horse", horse });
  }

  const correctPasscode = process.env.ADMIN_PASSCODE;
  if (!passcode || passcode !== correctPasscode) {
    return res.status(403).render("403", { title: "Incorrect passcode" });
  }
  return res.render("horses/form", { title: "Edit Horse", horse });
});

const editHorse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const horse = await db.getHorseById(id);
  if (!horse) {
    return res.status(404).send("Horse not found");
  }

  if (!horse.admin_created) {
    return res.render("horses/form", { title: "Edit Horse", horse });
  }
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
    const { name, breed_id, age, image_url } = req.body;

    const horse = await db.getHorseById(id);
    if (!horse) {
      return res.status(404).send("Horse not found");
    }

    await db.editHorse(
      id,
      name,
      parseInt(breed_id, 10),
      parseInt(age, 10),
      image_url
    );

    res.redirect("/");
  },
];

module.exports = {
  deleteHorse,
  addHorse,
  editHorse,
  confirmEditHorse,
  authEditHorse,
};
