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
// add image
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
  connection.query('SELECT loc FROM images WHERE prod_id = ?;', [prodId], (err, res) => {
    if (err) {
      callback(res, null);
    } else {
      callback(null, res);
    }
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

// =========== REVIEWS (done) ==========
const postReview = (title, date = new Date(), uname, body, starRating, prodId, callback) => {
  console.log([...arguments]);
  connection.query('INSERT INTO reviews (title, datePosted, username, body, star_rating, prod_id) VALUES (?, ?, ?, ?, ?, ?);', [title, date, uname, body, starRating, prodId], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
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
    //console.log('This is the result after username processing:' + JSON.stringify(result));
    callback(null, result);
  });
};

const getReview = (pid, callback) => {
  connection.query('SELECT * FROM reviews WHERE prod_id = ?;', [pid], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

const updateReview = (reviewId, reviewTitle, reviewDate = new Date(), reviewUname, reviewBody, reviewSRating = 0, callback) => {
  connection.query('UPDATE reviews SET title = ?, datePosted = ?, username = ?, body = ?, star_rating = ?, prod_id = ? WHERE id = ?',
  [reviewTitle, reviewDate, reviewUname, reviewBody, reviewSRating, reviewId],
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
// ===================================
// =========== USERS (done) ==========
const createUser = (uname, callback) => {
  connection.query('INSERT INTO users (username) VALUES (?);', [uname], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

const fetchUser = (uid, callback) => {
  connection.query('SELECT * FROM users WHERE id = ?;', [uid], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

const updateUser = (userId, userName, callback) => {
  connection.query('UPDATE users SET username = ? WHERE id = ?;', [userName, userId], (err, res) => {
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
const createProduct = (productName, callback) => {
  connection.query('INSERT INTO products (product_name) VALUES (?)', [productName], (err, res) => {
    if (err) {
      callback(err, null);
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

const updateProduct = (productId, productName, callback) => {
  connection.query('UPDATE products SET product_name = ? WHERE id = ?', [productName, productId], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

const deleteProduct = (productId, callback) => {
  connection.query('DELETE FROM products WHERE id = ?', [productId], (err, res) => {
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
    //('THE PRODUCT THAT CAME BACK: ' + JSON.stringify(result));
    callback(null, result);
  });
};


// module export those functions
module.exports = {
  createImage,
  fetchImages,
  updateImage,
  deleteImage,
  postReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};
