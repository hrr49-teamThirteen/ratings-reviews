const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsDB'
});

// create the functions

connection.connect();

const getOne = (callback) => {
  connection.query('SELECT column FROM products ORDER BY RAND() LIMIT 1;', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

const getReviews = (callback) => {
  connection.query('SELECT * FROM reviews;', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

const postReview = (data, callback) => {
  // data = JSON.parse(data);
  console.log('This is data itself: ' + data);
  console.log('This is data stringified: ' + JSON.stringify(data));
  console.log('This is data body: ' + data.body);
  console.log('This is data star_rating: ' + data.star_rating);
  console.log('This is data userid: ' + data.userid);
  connection.query(`INSERT INTO reviews (userid, body, star_rating, helpfulness_score) VALUES(${data.userid}, ${data.body}, ${data.star_rating}, 0);`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

const createUser = (data, callback) => {
  console.log('heres data: ' + data);
  connection.query(`INSERT INTO users (username) VALUES(${data.username});`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

// id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
//   userid int,
//   star_rating tinyint,
//   helpfulness_score tinyint,
//   image_id int,
//   FOREIGN KEY (userid) REFERENCES users(id),
//   FOREIGN KEY (image_id) REFERENCES images(id)

// think back to databases sprint for more info on promises and how to return them
// create a new promise that
// resolve the promise, and then you can chain into then
// const getAll = (callback) => {
//   connection.query('SELECT * FROM products', (error, result) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     callback(null, result);
//   });
// };

// module export those functions
module.exports = {
  getOne,
  getReviews,
  postReview,
  createUser
};