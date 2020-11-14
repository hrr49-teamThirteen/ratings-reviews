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
    const queryString = 'INSERT INTO products (product_name, image_path, department) VALUES(?, ?, ?);';
    const params = [product.productName, product.productImage, product.department];
    const insertedBatch = await connection.query(queryString, params);
  }
  connection.end();
};

seedFakeData(50);

// prolly just serve up static files with S3