const express = require("express");

const { loadBreeds } = require("./controllers/breedsController");
const { loadRiders } = require("./controllers/ridersController");

const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const indexRouter = require("./routes/indexRouter");

app.use(loadBreeds);
app.use(loadRiders);
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Perfect stables - listening on port ${PORT}! `);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
