const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsDB',
  password: 'password',
  insecureAuth: true
});

// create the functions

connection.connect();

// =========== IMAGES ==========
// create an image
const createImage = (prodId, imgLoc, callback) => {
  connection.query('INSERT INTO images (prod_id, loc) VALUES (?, ?)', [prodId, imgLoc], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(res);
    }
  });
};

// reads all images
const fetchImages = (prodId, callback) => {
  console.log('the prodId: ' + prodId);
  const imageQuery = `SELECT loc FROM images WHERE prod_id=${prodId};`;
  console.log('IMAGE QUERY: ' + imageQuery);
  connection.query(`SELECT loc FROM images WHERE prod_id=${prodId};`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('RESULT OF FETCHING IMAGE: ' + result);
    callback(null, result);
  });
};

// Update image product id, or location, based on image id.
const updateImage = (imgId, prodId, imgLoc, callback) => {
  connection.query('UPDATE images SET prod_id = ?, loc = ? VALUES (?, ?) WHERE id = ?', [prodId, imgLoc, imgId], (err, res) => {
    if (err) {
      callback(err, null);
      return;
    } else {
      callback(res);
    }
  });
};

// Delete image by image id
const deleteImage = (imgId, callback) => {
  connection.query('DELETE FROM images WHERE id = ?', [imgId], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

// =================================================================

const fetchUser = (userid, callback) => {
  connection.query(`SELECT * FROM users(username) WHERE id=${userid};`, (error, result) => {
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
      if (review.username === null) {
        fetchUser(review.userid, (error, result) => {
          review.username = result;
        });
      }
    }
    console.log('This is the result after username processing:' + JSON.stringify(result));
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

// module export those functions
module.exports = {
  getOne,
  getReviews,
  postReview,
  createUser,
  fetchUser,
  fetchImages
};
