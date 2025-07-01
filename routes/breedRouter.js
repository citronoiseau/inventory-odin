const { Router } = require("express");
const {
  addBreed,
  deleteBreed,
  editBreed,
} = require("../controllers/breedController");
const breedRouter = Router();

breedRouter.get("/add", (req, res) => {
  res.render("breeds/form", { title: "Add new breed" });
});
breedRouter.post("/add", addBreed);
breedRouter.post("/:id/delete", deleteBreed);

breedRouter.post("/:id/edit", editBreed);
module.exports = breedRouter;
