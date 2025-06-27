const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const loadBreeds = asyncHandler(async (req, res, next) => {
  try {
    const breeds = await db.getAllBreeds();
    res.locals.breeds = breeds;
    next();
  } catch (err) {
    next(err);
  }
});

const filterHorsesByBreed = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const horses = await db.filterHorsesByBreed(id);

  if (!horses) {
    throw new CustomNotFoundError("No horses found");
  }
  const breedName = horses[0].breed;
  res.render("filtered", { title: `Filtered by: ${breedName}`, horses });
});

// const deleteBreed = asyncHandler(async (req, res) => {
//   const breed = await db.getBreedById(id);
//   if (!breed.author_created) {
//     if (passcode !== process.env.ADMIN_PASSCODE) {
//       throw new Error("Unauthorized to delete author-created breed");
//     }
//   }
//   await db.deleteBreedById(id);
// });

module.exports = { loadBreeds, filterHorsesByBreed };
