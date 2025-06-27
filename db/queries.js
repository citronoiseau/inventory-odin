const pool = require("./pool");

async function getAllHorses() {
  const { rows } = await pool.query(`SELECT 
  horses.id,
  horses.name,
  breeds.name AS breed,
  horses.type,
  horses.age,
  riders.name AS rider,
  image_url
FROM horses
JOIN breeds ON horses.breed_id = breeds.id
JOIN riders ON horses.rider_id = riders.id;`);
  return rows;
}

async function getAllBreeds() {
  const { rows } = await pool.query(
    `SELECT name, id FROM breeds ORDER BY name ASC`
  );
  return rows;
}

async function getAllRiders() {
  const { rows } = await pool.query(
    `SELECT name, id FROM riders ORDER BY name ASC`
  );
  return rows;
}

async function filterHorsesByBreed(id) {
  const { rows } = await pool.query(
    `SELECT 
  horses.id,
  horses.name,
  breeds.name AS breed,
  horses.type,
  horses.age,
  riders.name AS rider,
  image_url
FROM horses
JOIN breeds ON horses.breed_id = breeds.id
JOIN riders ON horses.rider_id = riders.id
WHERE horses.breed_id = $1`,
    [id]
  );
  return rows;
}

async function filterHorsesByRider(id) {
  const { rows } = await pool.query(
    `SELECT 
  horses.id,
  horses.name,
  breeds.name AS breed,
  horses.type,
  horses.age,
  riders.name AS rider,
  image_url
FROM horses
JOIN breeds ON horses.breed_id = breeds.id
JOIN riders ON horses.rider_id = riders.id
WHERE horses.rider_id = $1`,
    [id]
  );
  return rows;
}

async function addHorse(name, breed_id, type, age, rider_id, image_url) {
  await pool.query(
    "INSERT INTO horses (name, breed_id, type, age, rider_id, image_url, author_created) VALUES ($1, $2, $3, $4, $5, $6, FALSE)",
    [name, breed_id, type, age, rider_id, image_url]
  );
}

module.exports = {
  getAllHorses,
  getAllBreeds,
  getAllRiders,
  filterHorsesByBreed,
  filterHorsesByRider,
  addHorse,
};
