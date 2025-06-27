const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const loadRiders = asyncHandler(async (req, res, next) => {
  try {
    const riders = await db.getAllRiders();
    res.locals.riders = riders;
    next();
  } catch (err) {
    next(err);
  }
});

const filterHorsesByRider = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const horses = await db.filterHorsesByRider(id);

  if (!horses) {
    throw new CustomNotFoundError("No horses found");
  }
  const riderName = horses[0].rider;
  res.render("filtered", { title: `Filtered by: ${riderName}`, horses });
});

module.exports = { loadRiders, filterHorsesByRider };
