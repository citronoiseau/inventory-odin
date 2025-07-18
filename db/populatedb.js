#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS breeds (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  admin_created BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS horses (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  breed_id INTEGER NOT NULL DEFAULT 1 REFERENCES breeds(id) ON DELETE SET DEFAULT,
  age INTEGER NOT NULL,
  image_url TEXT,
  admin_created BOOLEAN DEFAULT TRUE 
);

INSERT INTO breeds (name) VALUES
  ('No breed'),
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


INSERT INTO horses (name, breed_id, age, image_url) VALUES
  ('Spirit', 2, 5, 'https://www.bayequest.com/wp-content/uploads/2024/01/Arabian.png'),
  ('Shadow', 3, 6, 'https://sports.betmgm.com/en/blog/wp-content/uploads/2023/03/Greys-Header.jpg'),
  ('Daisy', 4, 7, 'https://images.photowall.com/products/51873/chestnut-quarter-horse.jpg?h=699&q=85'),
  ('Thunder', 5, 8, 'https://cdn.shopify.com/s/files/1/0765/3946/1913/files/a_galloping_appaloosa_horse.jpg?v=1729112828'),
  ('Star', 6, 4, 'https://cdn.ehorses.media/image/blur/big/friesian-horses-stallion-6years-16-hh-black-dressagehorses-baroquehorses-leisurehorses-carriagehorses-meinerzhagen_d9574ece-3dee-44f2-af9a-ff39ac9a9906.jpg'),
  ('Cinnamon', 7, 9, 'https://pangovet.com/wp-content/uploads/2024/06/American-Paint-Horse-2.jpg'),
  ('Nova', 8, 5, 'https://www.horseillustrated.com/wp-content/uploads/andalusian1-aprilviselphotography.jpg'),
  ('Pearl', 9, 6, 'https://cdn.seriouslyequestrian.com/wp-content/uploads/2023/08/Hannoverian-Horses.jpg'),
  ('Dusty', 10, 10, 'https://external-preview.redd.it/nySKv01CP_XySUillxOKJHPvbm2KQfP5WZs_VKb4huY.jpg?auto=webp&s=7d02d2a1c72102594a1348b6b24c9f9bcd897590'),
  ('Luna', 11, 4, 'https://cdn-fastly.petguide.com/media/2022/02/16/8215706/mustang-horse.jpg?size=720x845&nocrop=1'),
  ('Ranger', 2, 6, 'https://www.thesprucepets.com/thmb/7WFGllu1uE5v2NP15IHRApYt1tc=/4000x0/filters:no_upscale():strip_icc()/meet-the-arabian-horse-1886131-02-64d4f27ce4a0494ead528696c457083f.jpg'),
  ('Blaze', 4, 5, 'https://www.cowboysindians.com/wp-content/uploads/2024/02/TR-THIRDEDGE-40-scaled.jpg'),
  ('Echo', 5, 7, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Appaloosa_stallion.JPG/1280px-Appaloosa_stallion.JPG'),
  ('Skye', 6, 6, 'https://static.wixstatic.com/media/588c21_ee042043bb894b43b3c57cb0d6dc2b66~mv2.jpg/v1/fill/w_640,h_454,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/588c21_ee042043bb894b43b3c57cb0d6dc2b66~mv2.jpg'),
  ('Rocket', 7, 8, 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Paint_horse.jpg');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL_PROD,
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
