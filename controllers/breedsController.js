const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const db = require("../db/queries/horse-queries");

const addBreed = asyncHandler(async (req, res) => {
  const { breed_name } = req.body;

  await db.addBreed(breed_name);

  res.redirect("/");
});

const deleteBreed = asyncHandler(async (req, res) => {
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

  await db.deleteBreed(id);
  return res.redirect("/");
});

module.exports = {
  addBreed,
  deleteBreed,
};
