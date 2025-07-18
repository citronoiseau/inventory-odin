const asyncHandler = require("express-async-handler");
const db = require("../db/queries/general-queries");
const breedDb = require("../db/queries/breed-queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const loadBreeds = asyncHandler(async (req, res, next) => {
  const breeds = await db.getAllBreeds();
  res.locals.breeds = breeds;
  next();
});

const getAllHorses = asyncHandler(async (req, res) => {
  const horses = await db.getAllHorses();

  if (!horses) {
    throw new CustomNotFoundError("No horses found");
  }
  res.render("index", { horses, breed: null });
});

const filterHorses = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const horses = await db.filterHorses(id);
  const breed = await breedDb.getBreedById(id);

  if (!horses || horses.length === 0) {
    res.render("index", { horses: null, breed: breed });
  }

  const breedName = horses[0].breed;
  const breedId = horses[0].breed_id;
  const adminCreated = horses[0].breed_admin_created;

  res.render("index", {
    horses,
    breed: { id: breedId, name: breedName, admin_created: adminCreated },
  });
});

module.exports = { loadBreeds, getAllHorses, filterHorses };
