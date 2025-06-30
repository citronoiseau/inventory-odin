const { Router } = require("express");
const {
  getAllHorses,
  filterHorses,
  addHorse,
  deleteHorse,
  confirmDeleteHorse,
  editHorse,
  confirmEditHorse,
} = require("../controllers/horseController");
const indexRouter = Router();

indexRouter.get("/", getAllHorses);

indexRouter.get("/filter/:type/:id", filterHorses);

//Manipulating horse
indexRouter.get("/horse/add", (req, res) => {
  res.render("horses/form", { title: "Add new horse", horse: null });
});
indexRouter.post("/horse/add", addHorse);

indexRouter.get("/horse/:id/delete", deleteHorse);
indexRouter.post("/horse/:id/delete", confirmDeleteHorse);

indexRouter.get("/horse/:id/edit", editHorse);
indexRouter.post("/horse/:id/edit", confirmEditHorse);

//Manipulating breeds


module.exports = indexRouter;
