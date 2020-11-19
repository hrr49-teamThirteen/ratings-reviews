const mysql = require('mysql');
const fakeData = require('./fakeData.js');
const faker = require('faker');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsDB'
});

connection.connect((err) => {
  if (err) {
    console.error(error);
  }
});

// don't forget to use ? to escape from sql injections

const seedFakeData = async function (n) {
  const dataSeed = fakeData(n);
  console.log('HERES THE DATASEED: ' + JSON.stringify(dataSeed));
  for (let product of dataSeed.products) {
    let queryString = 'INSERT INTO products (product_name, image_path, department) VALUES(?, ?, ?);';
    let params = [product.productName, product.productImage, product.department];
    let insertedBatch = await connection.query(queryString, params);
  }
  for (let review of dataSeed.reviews) {
    let queryString = 'INSERT INTO reviews (star_rating, helpfulness_score, image_id) VALUES(?, ?, ?);';
    let params = [review.user, product.productImage, product.department];
  }
  connection.end();
};

seedFakeData(30);

// prolly just serve up static files with S3

// return {username: result[0], title: result[1], body: result[2], rating: result[3]};

