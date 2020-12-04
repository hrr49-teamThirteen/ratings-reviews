// COPY products(product_name) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/products.csv' DELIMITER ',' CSV HEADER;
// COPY users(username) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/users.csv' DELIMITER ',' CSV HEADER;
// COPY images(loc, prod_id) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/images.csv' DELIMITER ',' CSV HEADER;
// COPY reviews(title, date, body, star_rating, user_id, prod_id) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/reviews.csv' DELIMITER ',' CSV HEADER;

const { Client } = require('pg');

const client = new Client({
  user: 'student',
  host: 'localhost',
  database: 'reviewsdb',
  password: 'password',
  port: 5432
});

client.connect();

client.query("\\copy products(product_name) FROM '/home/user/Downloads/ratings-reviews/database/seeders/csv/products.csv' DELIMITER ',' CSV HEADER;", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

