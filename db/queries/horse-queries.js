const pool = require("../pool");

async function getHorseById(id) {
  const { rows } = await pool.query(
    `
    SELECT 
      horses.id,
      horses.name,
      horses.breed_id,
      breeds.name AS breed,
      horses.age,
      horses.image_url,
      horses.admin_created
    FROM horses
    JOIN breeds ON horses.breed_id = breeds.id
    WHERE horses.id = $1
    `,
    [id]
  );
  return rows[0];
}

async function addHorse(name, breed_id, age, image_url) {
  await pool.query(
    `INSERT INTO horses 
      (name, breed_id, age, image_url, admin_created) 
     VALUES 
      ($1, $2, $3, $4, FALSE)`,
    [name, breed_id, age, image_url]
  );
}

async function editHorse(id, name, breed_id, age, image_url) {
  await pool.query(
    `
    UPDATE horses 
    SET 
      name = $1,
      breed_id = $2,
      age = $3,
      image_url = $4
    WHERE id = $5
    `,
    [name, breed_id, age, image_url, id]
  );
}

async function deleteHorse(id) {
  await pool.query(`DELETE FROM horses WHERE id = $1`, [id]);
}

module.exports = {
  getHorseById,
  addHorse,
  deleteHorse,
  editHorse,
};
