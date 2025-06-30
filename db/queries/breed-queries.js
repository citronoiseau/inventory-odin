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

module.exports = {
  addBreed
};
