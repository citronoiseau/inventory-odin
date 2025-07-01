const express = require("express");
const indexRouter = require("./routes/indexRouter");
const horseRouter = require("./routes/horseRouter");
const breedRouter = require("./routes/breedRouter");
const { loadBreeds } = require("./controllers/loadController");

const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(loadBreeds);
app.use("/", indexRouter);
app.use("/horse", horseRouter);
app.use("/breed", breedRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Perfect stables - listening on port ${PORT}! `);
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found" });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
