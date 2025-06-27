const { Router } = require("express");
const {
  getAllHorses,
  filterHorses,
  addHorse,
  deleteHorse,
  confirmDeleteHorse,
} = require("../controllers/horseController");
const indexRouter = Router();

indexRouter.get("/", getAllHorses);

indexRouter.get("/filter/:type/:id", filterHorses);

indexRouter.get("/add", (req, res) => {
  res.render("form", { title: "Add new horse" });
});

indexRouter.post("/add", addHorse);

indexRouter.get("/delete/:id", deleteHorse);
indexRouter.post("/delete/:id", confirmDeleteHorse);

module.exports = indexRouter;
