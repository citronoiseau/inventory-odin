#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS breeds (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  admin_created BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS riders (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  admin_created BOOLEAN DEFAULT TRUE 
);

CREATE TABLE IF NOT EXISTS horses (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  breed_id INTEGER NOT NULL REFERENCES breeds(id),
  age INTEGER NOT NULL,
  rider_id INTEGER NOT NULL REFERENCES riders(id),
  image_url TEXT,
  admin_created BOOLEAN DEFAULT TRUE 
);

INSERT INTO breeds (name) VALUES
  ('Arabian'),
  ('Thoroughbred'),
  ('Quarter Horse'),
  ('Appaloosa'),
  ('Friesian'),
  ('Paint Horse'),
  ('Andalusian'),
  ('Hanoverian'),
  ('Gypsy Vanner'),
  ('Mustang');

INSERT INTO riders (name) VALUES 
  ('Alice'),
  ('Bob'),
  ('Asia'),
  ('Emily'),
  ('Owen');

INSERT INTO horses (name, breed_id, age, rider_id, image_url) VALUES
  ('Spirit', 1, 5, 1, 'https://www.bayequest.com/wp-content/uploads/2024/01/Arabian.png'),
  ('Shadow', 2, 6, 2, 'https://sports.betmgm.com/en/blog/wp-content/uploads/2023/03/Greys-Header.jpg'),
  ('Daisy', 3, 7, 3, 'https://images.photowall.com/products/51873/chestnut-quarter-horse.jpg?h=699&q=85'),
  ('Thunder', 4, 8, 1, 'https://cdn.shopify.com/s/files/1/0765/3946/1913/files/a_galloping_appaloosa_horse.jpg?v=1729112828'),
  ('Star', 5, 4, 2, 'https://cdn.ehorses.media/image/blur/big/friesian-horses-stallion-6years-16-hh-black-dressagehorses-baroquehorses-leisurehorses-carriagehorses-meinerzhagen_d9574ece-3dee-44f2-af9a-ff39ac9a9906.jpg'),
  ('Cinnamon', 6, 9, 4, 'https://pangovet.com/wp-content/uploads/2024/06/American-Paint-Horse-2.jpg'),
  ('Nova', 7, 5, 5, 'https://www.horseillustrated.com/wp-content/uploads/andalusian1-aprilviselphotography.jpg'),
  ('Pearl', 8, 6, 3, 'https://cdn.seriouslyequestrian.com/wp-content/uploads/2023/08/Hannoverian-Horses.jpg'),
  ('Dusty', 9, 10, 4, 'https://external-preview.redd.it/nySKv01CP_XySUillxOKJHPvbm2KQfP5WZs_VKb4huY.jpg?auto=webp&s=7d02d2a1c72102594a1348b6b24c9f9bcd897590'),
  ('Luna', 10, 4, 5, 'https://cdn-fastly.petguide.com/media/2022/02/16/8215706/mustang-horse.jpg?size=720x845&nocrop=1'),
  ('Ranger', 1, 6, 2, 'https://www.thesprucepets.com/thmb/7WFGllu1uE5v2NP15IHRApYt1tc=/4000x0/filters:no_upscale():strip_icc()/meet-the-arabian-horse-1886131-02-64d4f27ce4a0494ead528696c457083f.jpg'),
  ('Blaze', 3, 5, 1, 'https://www.cowboysindians.com/wp-content/uploads/2024/02/TR-THIRDEDGE-40-scaled.jpg'),
  ('Echo', 4, 7, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Appaloosa_stallion.JPG/1280px-Appaloosa_stallion.JPG'),
  ('Skye', 5, 6, 5, 'https://static.wixstatic.com/media/588c21_ee042043bb894b43b3c57cb0d6dc2b66~mv2.jpg/v1/fill/w_640,h_454,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/588c21_ee042043bb894b43b3c57cb0d6dc2b66~mv2.jpg'),
  ('Rocket', 6, 8, 2, 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Paint_horse.jpg');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Table created and data inserted");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.end();
  }
  console.log("done");
}

main();
