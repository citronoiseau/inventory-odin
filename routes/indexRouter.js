const { Router } = require("express");
const { getAllHorses, filterHorses } = require("../controllers/loadController");

const indexRouter = Router();

indexRouter.get("/", getAllHorses);

indexRouter.get("/filter/:type/:id", filterHorses);

module.exports = indexRouter;
