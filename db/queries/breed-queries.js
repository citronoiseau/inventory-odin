const pool = require("../pool");

async function addBreed(name) {
  await pool.query(
    `INSERT INTO breeds
      (name, admin_created) 
     VALUES 
      ($1, FALSE)`,
    [name]
  );
}

async function deleteBreed(id) {
  await pool.query(`DELETE FROM breeds WHERE id = $1`, [id]);
}

async function getBreedById(id) {
  const { rows } = await pool.query(
    `
    SELECT 
      breeds.id,
      breeds.name
    FROM breeds
    WHERE breeds.id = $1
    `,
    [id]
  );
  return rows[0];
}

async function editBreed(id, name) {
  await pool.query(
    `
    UPDATE breeds
    SET 
      name = $1
    WHERE id = $2
    `,
    [name, id]
  );
}

module.exports = {
  addBreed,
  deleteBreed,
  getBreedById,
  editBreed,
};
