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
  //console.log('the prodId: ' + prodId);
  const imageQuery = `SELECT loc FROM images WHERE prod_id=${prodId};`;
  //console.log('IMAGE QUERY: ' + imageQuery);
  connection.query(`SELECT loc FROM images WHERE prod_id=${prodId};`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    //console.log('RESULT OF FETCHING IMAGE: ' + result);
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

const updateReview = (callback, reviewId, reviewTitle, reviewUname, reviewBody, reviewSRating = 0, reviewHScore = 0, reviewImgPath = 'NULL', reviewDate = new Date()) => {
  connection.query('UPDATE reviews SET title = ?, datePosted = ?, username = ?, body = ?, star_rating = ?, helpfulness_score = ?, image_path = ? WHERE id = ?',
  [reviewTitle, reviewDate, reviewUname, reviewBody, reviewSRating, reviewHScore, reviewImgPath, reviewId],
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

// =========== REVIEWS (done) ==========



// module export those functions
module.exports = {
  createImage,
  fetchImages,
  updateImage,
  deleteImage,
  postReview,
  getReviews,
  updateReview,
  deleteReview
};
