const breedRouter = require("../../routes/breedRouter");
const pool = require("../pool");

async function getAllBreeds() {
  const query = `SELECT id, name, admin_created FROM breeds`;
  const { rows } = await pool.query(query);
  return rows;
}
async function getAllHorses() {
  const { rows } = await pool.query(`
    SELECT 
      horses.id,
      horses.name,
      breeds.name AS breed,
      horses.age,
      horses.image_url,
      horses.admin_created
    FROM horses
    JOIN breeds ON horses.breed_id = breeds.id
    ORDER BY horses.id
  `);
  return rows;
}

async function filterHorses(id) {
  const { rows } = await pool.query(
    `
    SELECT 
      horses.id,
      horses.name,
      breeds.id AS breed_id,
      breeds.name AS breed,
      breeds.admin_created as breed_admin_created,
      horses.age,
      horses.image_url,
      horses.admin_created
    FROM horses
    JOIN breeds ON horses.breed_id = breeds.id
    WHERE breeds.id = $1
    `,
    [id]
  );

  return rows;
}

module.exports = {
  getAllHorses,
  getAllBreeds,
  filterHorses,
};
