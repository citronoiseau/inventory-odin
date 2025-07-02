const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries/breed-queries");

const validateBreed = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage("Breed name must be 2 to 15 characters"),
];

const addBreed = [
  ...validateBreed,
  async (req, res) => {
    console.log("Received form data:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;

    await db.addBreed(name);

    res.redirect("/");
  },
];

const deleteBreed = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { breed_passcode } = req.body;

  const breed = await db.getBreedById(id);
  if (!breed) {
    return res.status(404).send("Breed not found");
  }

  if (breed.admin_created) {
    const correctPasscode = process.env.ADMIN_PASSCODE;
    if (!breed_passcode || breed_passcode !== correctPasscode) {
      return res.status(403).send("Invalid or missing passcode");
    }
  }

  await db.deleteBreed(id);
  return res.redirect("/");
});

const editBreed = [
  ...validateBreed,
  async (req, res) => {
    console.log("Received form data:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name, breedEditPasscode } = req.body;

    const breed = await db.getBreedById(id);
    if (!breed) {
      return res.status(404).send("Breed not found");
    }
    if (breed.admin_created) {
      const correctPasscode = process.env.ADMIN_PASSCODE;
      if (!breedEditPasscode || breedEditPasscode !== correctPasscode) {
        return res.status(403).render("403", { title: "Incorrect passcode" });
      }
    }

    await db.editBreed(id, name);

    res.redirect("/");
  },
];

module.exports = {
  addBreed,
  deleteBreed,
  editBreed,
};
