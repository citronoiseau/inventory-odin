const { Router } = require("express");
const {
  getAllHorses,
  filterHorses,
  addHorse,
} = require("../controllers/horseController");
const indexRouter = Router();

indexRouter.get("/", getAllHorses);

indexRouter.get("/filter/:type/:id", filterHorses);

indexRouter.get("/add", (req, res) => {
  res.render("form", { title: "Add new horse" });
});

indexRouter.post("/add", addHorse);

//indexRouter.get("/horse/:id", getHorseById);

module.exports = indexRouter;
