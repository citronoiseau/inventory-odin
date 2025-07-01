const { Router } = require("express");
const {
  addHorse,
  deleteHorse,
  authEditHorse,
  editHorse,
  confirmEditHorse,
} = require("../controllers/horseController");

const horseRouter = Router();

horseRouter.get("/add", (req, res) => {
  res.render("/form", { title: "Add new horse", horse: null });
});
horseRouter.post("/add", addHorse);
horseRouter.post("/:id/delete", deleteHorse);

horseRouter.post("/:id/edit-auth", authEditHorse);
horseRouter.get("/:id/edit", editHorse);
horseRouter.post("/:id/edit", confirmEditHorse);

module.exports = horseRouter;
