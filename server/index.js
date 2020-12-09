const port = 4444;

const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public/'));

require('newrelic');

// =========== IMAGES ==========
// add image
app.post('/api/ratings/images/insert/:review_id', (req, res) => {
  const reviewId = Number(req.params.review_id);
  const loc = String(req.query.loc);

  db.createImage(reviewId, loc, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// return images for a product. originally: /api/ratings/:prodId/images
app.get('/api/ratings/images/:prodId', (req, res) => {
  db.fetchImages(req.params.prodId, (error, result) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.status(200).send(result);
    }
  });
});

// Update image product id, or location, based on image id.
app.post('/api/ratings/images/update/:imgId/:review_id', (req, res) => {
  const imgId = Number(req.params.imgId);
  const reviewId = Number(req.params.review_id);
  const loc = String(req.query.loc);

  db.updateImage(imgId, reviewId, loc, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// Delete image by image id
app.post('/api/ratings/images/delete/:imgId', (req, res) => {
  const imgId = Number(req.params.imgId);

  db.deleteImage(imgId, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send('Success');
    }
  });
});
// =============================
// ========== REVIEWS ==========
// add review
app.post('/api/ratings/reviews/insert/:pId', (req, res) => {
  const productId = Number(req.params.pId);
  const uname = String(req.query.username);
  const title = String(req.query.title);
  const date = req.query.date;
  const body = String(req.query.body);
  const starRating = Number(req.query.rating);

  db.postReview(title, date, uname, body, starRating, productId, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// get reviews. original and shouldnt practically be used
/*app.get('/api/ratings/reviews', (req, res) => {
  db.getReviews((err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});*/

// gets a single review based on product id
app.get('/api/ratings/reviews/:pId', (req, res) => {
  const productId = Number(req.params.pId);

  db.getReview(productId, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// update a review
app.post('/api/ratings/reviews/update/:rId', (req, res) => {
  const reviewId = Number(req.params.rId);
  const title = String(req.query.title);
  const date = req.query.date;
  const uname = String(req.query.name);
  const body = String(req.query.body);
  const starRating = Number(req.query.rating);
  const productId = Number(req.query.pid);

  db.updateReview(reviewId, title, date, uname, body, starRating, productId, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// delete a review
app.post('/api/ratings/reviews/delete/:rId', (req, res) => {
  const reviewId = Number(req.params.rId);

  db.deleteReview(reviewId, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send('Success');
    }
  });
});

// =============================
// =========== Users ===========
// add user
app.post('/api/ratings/users/insert', (req, res) => {
  const uname = String(req.query.name);

  db.createUser(uname, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// get a user
app.get('/api/ratings/users/:uId', (req, res) => {
  const uid = Number(req.params.uId);
  db.fetchUser(uid, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// update a user
app.post('/api/ratings/users/update/:uId', (req, res) => {
  const uid = Number(req.params.uId);
  const uname = String(req.query.name);

  db.updateUser(uid, uname, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// delete a user
app.post('/api/ratings/users/delete/:uId', (req, res) => {
  const uid = String(req.params.uId);

  db.deleteUser(uid, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});
// =============================
// ========= Products ==========
// add a product
app.post('/api/ratings/products/insert', (req, res) => {
  const productName = req.query.name;
  db.createProduct(productName, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// get a product
app.get('/api/ratings/products/:pId', (req, res) => {
  const productId = req.params.pId;
  db.getProduct(productId, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// update a product
app.post('/api/ratings/products/update/:pId', (req, res) => {
  const productId = req.params.pId;
  const productName = req.query.name;

  db.updateProduct(productId, productName, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// delete a product
app.post('/api/ratings/products/delete/:pId', (req, res) => {
  const productId = req.params.pId;

  db.deleteProduct(productId, (err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});
// =============================

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});