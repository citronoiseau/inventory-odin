const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const db = require("../db/queries");

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
    types: "type",
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

const addHorse = asyncHandler(async (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).send("User and text are required");
  }

  await db.addHorse(text, user);
  res.redirect("/");
});

module.exports = { getAllHorses, addHorse, filterHorses };
