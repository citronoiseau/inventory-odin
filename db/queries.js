const pool = require("./pool");

async function getAllHorses() {
  const { rows } = await pool.query(`
    SELECT 
      horses.id,
      horses.name,
      breeds.name AS breed,
      types.name AS type,
      horses.age,
      riders.name AS rider,
      horses.image_url
    FROM horses
    JOIN breeds ON horses.breed_id = breeds.id
    JOIN types ON horses.type_id = types.id
    JOIN riders ON horses.rider_id = riders.id
  `);
  return rows;
}

async function getHorseById(id) {
  const { rows } = await pool.query(
    `
    SELECT 
      horses.id,
      horses.name,
      breeds.name AS breed,
      types.name AS type,
      horses.age,
      riders.name AS rider,
      horses.image_url,
      horses.admin_created
    FROM horses
    JOIN breeds ON horses.breed_id = breeds.id
    JOIN types ON horses.type_id = types.id
    JOIN riders ON horses.rider_id = riders.id
    WHERE horses.id = $1
    `,
    [id]
  );
  return rows[0];
}
async function getAllFromTable(tableName) {
  const query = `SELECT id, name FROM ${tableName} ORDER BY name ASC`;
  const { rows } = await pool.query(query);
  return rows;
}

async function filterHorsesBy(column, id) {
  const allowedColumns = {
    breed: "horses.breed_id",
    rider: "horses.rider_id",
    type: "horses.type_id",
  };

  const columnName = allowedColumns[column];
  if (!columnName) {
    throw new Error("Invalid filter column");
  }

  const { rows } = await pool.query(
    `
    SELECT 
      horses.id,
      horses.name,
      breeds.name AS breed,
      types.name AS type,
      horses.age,
      riders.name AS rider,
      horses.image_url
    FROM horses
    JOIN breeds ON horses.breed_id = breeds.id
    JOIN types ON horses.type_id = types.id
    JOIN riders ON horses.rider_id = riders.id
    WHERE ${columnName} = $1
    `,
    [id]
  );

  return rows;
}

async function addHorse(name, breed_id, type_id, age, rider_id, image_url) {
  await pool.query(
    `INSERT INTO horses 
      (name, breed_id, type_id, age, rider_id, image_url, admin_created) 
     VALUES 
      ($1, $2, $3, $4, $5, $6, FALSE)`,
    [name, breed_id, type_id, age, rider_id, image_url]
  );
}

async function deleteHorse(id, passcode = null) {
  await pool.query(`DELETE FROM horses WHERE id = $1`, [id]);
}

module.exports = {
  getAllHorses,
  getHorseById,
  getAllFromTable,
  filterHorsesBy,
  addHorse,
  deleteHorse,
};
