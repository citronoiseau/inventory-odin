const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const db = require("../db/queries/horse-queries");

const addBreed = asyncHandler(async (req, res) => {
  const { breed_name } = req.body;

  await db.addBreed(breed_name);

  res.redirect("/");
});

module.exports = {
  addBreed,
};
