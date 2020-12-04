// COPY products(product_name) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/products.csv' DELIMITER ',' CSV HEADER;
// COPY users(username) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/users.csv' DELIMITER ',' CSV HEADER;
// COPY images(loc, prod_id) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/images.csv' DELIMITER ',' CSV HEADER;
// COPY reviews(title, date, body, star_rating, user_id, prod_id) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/reviews.csv' DELIMITER ',' CSV HEADER;

console.log('Warning: This is very slow! If possible, you should be running the COPY commands directly from psql.')

const { Client } = require('pg');
const client = new Client({
  user: 'student',
  host: 'localhost',
  database: 'reviewsdb',
  password: 'password',
  port: 5432
});
client.connect();


const fs = require('fs');
const readline = require('readline');

async function processLineByLine(file, query) {
  console.log(`Query: ${query}\nWith data from: ${file}`)
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    await client.query(query, line.split());
  }
}

new Promise((res, rej) => {
  return processLineByLine('/home/user/Downloads/ratings-reviews/database/seeders/csv/products.csv',
  'INSERT INTO products (product_name) VALUES ($1)');
}).then((res) => {
  return processLineByLine('/home/user/Downloads/ratings-reviews/database/seeders/csv/users.csv',
  'INSERT INTO users (username) VALUES ($1)');
})
.then((res) => {
  return processLineByLine('/home/user/Downloads/ratings-reviews/database/seeders/csv/images.csv',
'INSERT INTO images (loc, prod_id) VALUES ($1, $2)');
})
.then((res) => {
  return processLineByLine('/home/user/Downloads/ratings-reviews/database/seeders/csv/reviews.csv',
'INSERT INTO reviews (title, date, body, star_rating, user_id, prod_id) VALUES ($1, $2, $3, $4, $5, $6)');
});