const mysql = require('mysql');
const fakeData = require('./fakeData.js');
const faker = require('faker');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsDB',
  password: 'password'
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  }
});

// don't forget to use ? to escape from sql injections

const seedFakeData = async function (n) {
  const dataSeed = fakeData(n);
  var i = 4;
  const indexes = [];

  for (let image of dataSeed.images) {
    let queryString = 'INSERT INTO images (prod_id, loc) VALUES (?, ?);';
    await connection.query(queryString, [Math.floor(i / 4), image]);
    i++;
  }

  for (let review of dataSeed.reviews) {
    let queryString = 'INSERT INTO reviews (body, datePosted, username, title, star_rating, prod_id) VALUES(?, ?, ?, ?, ?, ?);';
    let params = [review.body, review.datePosted, review.username, review.title, Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * n) + 1];
    await connection.query(queryString, params);
  }

  connection.end();
};

seedFakeData(30);

