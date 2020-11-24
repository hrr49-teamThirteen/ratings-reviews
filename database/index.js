const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsDB',
  insecureAuth: true
});

// create the functions

connection.connect();

const fetchImages = (prodId, callback) => {
  console.log('the prodId: ' + prodId);
  connection.query(`SELECT loc FROM images WHERE prod_id=${prodId};`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('RESULT OF FETCHING IMAGE: ' + result);
    callback(null, result);
  });
};

const fetchUser = (userid, callback) => {
  connection.query(`SELECT FROM users(username) WHERE id=${userid};`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

const getOne = (callback) => {
  connection.query('SELECT * FROM products ORDER BY RAND() LIMIT 1;', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('THE PRODUCT THAT CAME BACK: ' + JSON.stringify(result));
    callback(null, result);
  });
};

const getReviews = (callback) => {
  connection.query('SELECT * FROM reviews;', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    for (let review of result) {
      if (review.username === undefined) {
        fetchUser(review.userid, (error, result) => {
          review.username = result;
        });
      }
    }
    callback(null, result);
  });
};

const postReview = (data, callback) => {
  connection.query(`INSERT INTO reviews (userid, body, star_rating, helpfulness_score) VALUES(${data.userid}, ${data.body}, ${data.star_rating}, 0);`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

const createUser = (data, callback) => {
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
  createUser,
  fetchUser,
  fetchImages
};