const { Router } = require("express");
const { getAllHorses, addHorse } = require("../controllers/horseController");
const { filterHorsesByBreed } = require("../controllers/breedsController");
const { filterHorsesByRider } = require("../controllers/ridersController");
const indexRouter = Router();

indexRouter.get("/", getAllHorses);

indexRouter.get("/filter/breeds/:id", filterHorsesByBreed);
indexRouter.get("/filter/riders/:id", filterHorsesByRider);

indexRouter.post("/add", addHorse);

//indexRouter.get("/horse/:id", getHorseById);

module.exports = indexRouter;
