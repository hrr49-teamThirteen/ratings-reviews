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

// =========== IMAGES (done) ==========
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
  connection.query('UPDATE images SET prod_id = ?, loc = ? WHERE id = ?', [prodId, imgLoc, imgId], (err, res) => {
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

// =========== USERS (done) ==========
const createUser = (data, callback) => {
  connection.query('INSERT INTO users (username) VALUES(?);', [data.username], (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

const fetchUser = (userid, callback) => {
  connection.query('SELECT * FROM users (username) WHERE id = ?;' [userid], (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

const updateUser = (userId, userName, callback) => {
  connection.query('UPDATE users SET username = ? WHERE id = ?;', [userId, userName], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

const deleteUser = (userId, callback) => {
  connection.query('DELETE FROM users WHERE id = ?;', [userId], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

// =========== PRODUCTS (done) ==========
const createProduct = (productName, productDpt, callback) => {
  connection.query('INSERT INTO products (product_name, department) VALUES (?, ?)', [productName, productDpt], (err, res) => {
    if (err) {
      callback(err, null);
      return;
    } else {
      callback(null, res);
    }
  });
};

const getProduct = (id, callback) => {
  connection.query('SELECT * FROM products WHERE id = ?;', [id], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

const updateProduct = (productId, productName, productDpt, callback) => {
  connection.query('UPDATE products SET product_name = ?, department = ? WHERE id = ?', [productId, productDpt, productId], (err, res) => {
    if (err) {
      callback(err, null);
      return;
    } else {
      callback(null, res);
    }
  });
};

const deleteProduct = (productId, callback) => {
  connection.query('DELETE FROM images WHERE id = ?', [productId], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

// just returns a random product, and shouldn't be used. front-end currently reliant on it.
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

// =========== REVIEWS ==========
const postReview = (data, callback) => {
  connection.query(`INSERT INTO reviews (userid, body, star_rating, helpfulness_score) VALUES(${data.userid}, ${data.body}, ${data.star_rating}, 0);`, (error, result) => {
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

const updateReview = (reviewId, reviewTitle, reviewUname, reviewBody, reviewSRating = 0, reviewHScore = 0, reviewImgPath = 'NULL', callback) => {
  connection.query('UPDATE reviews SET title = ?, datePosted = NULL, username = ?, body = ?, star_rating = ?, helpfulness_score = ?, image_path = ? WHERE id = ?',
  [reviewTitle, reviewUname, reviewBody, reviewSRating, reviewHScore, reviewImgPath, reviewId],
  (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

const deleteReview = (reviewId, callback) => {
  connection.query('DELETE FROM reviews WHERE id = ?', [reviewId], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, err);
    }
  });
};


// module export those functions
module.exports = {
  createImage,
  fetchImages,
  updateImage,
  deleteImage,
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getOne,
  postReview,
  getReviews,
  updateReview,
  deleteReview
};
