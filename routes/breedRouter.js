const { Router } = require("express");
const { addBreed } = require("../controllers/breedController");
const breedRouter = Router();

breedRouter.post("/add", addBreed);

module.exports = breedRouter;
