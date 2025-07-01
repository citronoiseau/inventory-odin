const { Router } = require("express");
const { addBreed, deleteBreed } = require("../controllers/breedController");
const breedRouter = Router();

breedRouter.get("/add", (req, res) => {
  res.render("breeds/form", { title: "Add new breed" });
});
breedRouter.post("/add", addBreed);
breedRouter.post("/:id/delete", deleteBreed);

module.exports = breedRouter;
