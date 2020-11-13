const mysql = require('mysql');
const fakeData = require('./fakeData.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsDB'
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
});

const seedFakeData = (n) => {
  // create a variable that is equal to a call to fakeData passing in n
  const dataSeed = fakeData(n);
  // for each item in the products prop in that variable
  for (let product of dataSeed.products) {
    connection.query(`INSERT INTO products ('product_name', 'image_path', 'department') VALUES(${product.productName}, ${product.productImage}, ${product.department});`);
    // insert into the rateable_attributes table of reviewsDB a row with attribute_name set to the item's prodAdj

  // insert into users table of reviewsDB a row with username set to the item's
  }
};

seedFakeData(10);

// CREATE TABLE products (
//   id int AUTO_INCREMENT PRIMARY KEY,
//   product_name varchar(120),
//   image_path varchar(120),
//   department varchar(50)
// );

// CREATE TABLE rateable_attributes (
//   id int AUTO_INCREMENT PRIMARY KEY,
//   attribute_name varchar(50)
// );

// CREATE TABLE users (
//   id int NOT NULL AUTO_INCREMENT,
//   username varchar(50)
// );

// CREATE TABLE images (
//   id int NOT NULL AUTO_INCREMENT,
//   loc varchar(100)
// );

// CREATE TABLE reviews (
//   id int AUTO_INCREMENT,
//   user_id smallint,
//   star_rating tinyint,
//   helpfulness_score tinyint,
//   image_id int,
//   PRIMARY KEY (id),
//   FOREIGN KEY user_id REFERENCES users(id),
//   FOREIGN KEY image_id REFERENCES images(id)
// );