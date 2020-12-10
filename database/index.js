const pg = require('pg');

const conn = {
  host: 'localhost',
  port: 5432,
  user: 'student',
  database: 'reviewsdb',
  password: 'password',
};

const connection = new pg.Client(`postgres://${conn.user}:${conn.password}@${conn.host}:${conn.port}/${conn.database}`)

connection.connect();

// =========== IMAGES (done) ==========
// add image
const createImage = (reviewId, imgLoc, callback) => {
  connection.query('INSERT INTO images (loc, review_id) VALUES ($1, $2)', [imgLoc, reviewId]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

// reads all images
const fetchImages = (prodId, callback) => {
  connection.query('select i.loc from reviews r left join images i on r.id = i.review_id where r.prod_id = $1;', [prodId]).then(res => {
    callback(null, res.rows);
  }).catch(err => {
    callback(err, null);
  });
};

// Update image product id, or location, based on image id.
const updateImage = (imgLoc, reviewId, imgId, callback) => {
  connection.query('UPDATE images SET loc = $1, review_id = $2 WHERE id = $3', [imgLoc, reviewId, imgId]).then(res => {
    callback(null, res.rows);
  }).catch(err => {
    callback(err, null);
  });
};

// Delete image by image id
const deleteImage = (imgId, callback) => {
  connection.query('DELETE FROM images WHERE id = $1', [imgId]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

// =========== REVIEWS (done) ==========
const postReview = (title, date = new Date(), body, starRating, userId, prodId, callback) => {
  //console.log([...arguments]);
  connection.query('INSERT INTO reviews (title, date, body, star_rating, user_id, prod_id) VALUES ($1, $2, $3, $4, $5, $6);', [title, date, body, starRating, userId, prodId]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

const getReviews = (pid = 1, callback) => {
  connection.query('SELECT * FROM reviews WHERE prod_id = $1;', [pid]).then(res => {
    callback(null, res.rows)
  }).catch(err => {
    callback(err, null);
  });
};

const updateReview = (reviewId, reviewTitle, reviewDate = new Date(), reviewBody, reviewSRating = 0, userId, prodId, callback) => {
  connection.query('UPDATE reviews SET title = $1, date = $2, body = $3, star_rating = $4, user_id = $5, prod_id = $6 WHERE id = $7',
  [reviewTitle, reviewDate, reviewBody, reviewSRating, userId, prodId, reviewId]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

const deleteReview = (reviewId, callback) => {
  connection.query('DELETE FROM reviews WHERE id = $1', [reviewId]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};
// ===================================
// =========== USERS (done) ==========
const createUser = (uname, callback) => {
  connection.query('INSERT INTO users (username) VALUES ($1);', [uname]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

const fetchUser = (uid, callback) => {
  connection.query('SELECT * FROM users WHERE id = $1;', [uid]).then(res => {
    callback(null, res.rows);
  }).catch(err => {
    callback(err, null);
  });
};

const updateUser = (userId, userName, callback) => {
  connection.query('UPDATE users SET username = $1 WHERE id = $2;', [userName, userId]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

const deleteUser = (userId, callback) => {
  connection.query('DELETE FROM users WHERE id = $1;', [userId]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

// =========== PRODUCTS (done) ==========
const createProduct = (productName, callback) => {
  connection.query('INSERT INTO products (product_name) VALUES ($1)', [productName]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

const getProduct = (id, callback) => {
  connection.query('SELECT * FROM products WHERE id = $1;', [id]).then(res => {
    callback(null, res.rows);
  }).catch(err => {
    callback(err, null);
  });
};

const updateProduct = (productId, productName, callback) => {
  connection.query('UPDATE products SET product_name = $1 WHERE id = $2', [productName, productId]).then(res => {
    callback(null, res);
  }).then(err => {
    callback(err, null);
  });
};

const deleteProduct = (productId, callback) => {
  connection.query('DELETE FROM products WHERE id = $1', [productId]).then(res => {
    callback(null, res);
  }).catch(err => {
    callback(err, null);
  });
};

// just returns a random product, and shouldn't be used. front-end currently reliant on it.
/*const getOne = (callback) => {
  connection.query('SELECT * FROM products ORDER BY RAND() LIMIT 1;', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    //('THE PRODUCT THAT CAME BACK: ' + JSON.stringify(result));
    callback(null, result);
  });
};*/


// module export those functions
module.exports = {
  createImage,
  fetchImages,
  updateImage,
  deleteImage,
  postReview,
  getReviews,
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
