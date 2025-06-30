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

module.exports = {
  addBreed,
  deleteBreed,
};
