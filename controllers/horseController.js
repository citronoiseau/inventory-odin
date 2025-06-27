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

const addHorse = asyncHandler(async (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).send("User and text are required");
  }

  await db.addHorse(text, user);
  res.redirect("/");
});

module.exports = { getAllHorses, addHorse };
