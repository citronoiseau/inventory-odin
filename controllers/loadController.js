const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

function createLoader(name) {
  return asyncHandler(async (req, res, next) => {
    const items = await db.getAllFromTable(name);
    res.locals[name] = items;
    next();
  });
}

const loadRiders = createLoader("riders");
const loadBreeds = createLoader("breeds");
const loadTypes = createLoader("types");

module.exports = { loadRiders, loadBreeds, loadTypes };
