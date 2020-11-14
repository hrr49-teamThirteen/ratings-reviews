const mysql = require('mysql');
const fakeData = require('./fakeData.js');
const faker = require('faker');
const util = require('util');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsDB'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
});

console.log(faker.image.image());
console.log(faker.commerce.productName());
console.log(faker.commerce.department());

// don't forget to use ? to escape from sql injections

// let seedFakeData = (n) => {
//   // create a variable that is equal to a call to fakeData passing in n
//   const dataSeed = util.promisify(fakeData(n))
//     .then((result) => {

//       // for each item in the products prop in that variable
//       console.log(dataSeed);
//       console.log(dataSeed.products);
//       for (let product of dataSeed.products) {
//         const queryString = 'INSERT INTO products (product_name, image_path, department) VALUES(?, ?, ?);';
//         const params = [product.name, product.image_path, product.department];
//         console.log('HERES THE IMAGE PATH: ' + params[1]);
//         console.log(product.name);
//         console.log(params);
//         resolve(db.query(queryString, params))
//          .then((result) => {

//       })
//       }catch(error => {
//         console.error(error);
//       })
//     // insert into the rateable_attributes table of reviewsDB a row with attribute_name set to the item's prodAdj

//   // insert into users table of reviewsDB a row with username set to the item's
// };

// seedFakeData = util.promisify(seedFakeData);



// seedFakeData(1)
//   .then(db.end());

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

// prolly just serve up static files with S3