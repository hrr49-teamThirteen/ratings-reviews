const port = 4444;

const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public/'));

// =========== IMAGES ==========
// add image
app.post('/api/ratings/images/insert/:prodId', (req, res) => {
  const prodId = Number(req.params.prodId);
  const loc = String(req.query.loc);

  db.createImage(prodId, loc, (err, dat) => {
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
      console.error(error);
      return;
    }
    res.status(200).send(result);
  });
});

// Update image product id, or location, based on image id.
app.post('/api/ratings/images/update/:imgId/:prodId', (req, res) => {
  const imgId = Number(req.params.imgId);
  const prodId = Number(req.params.prodId);
  const loc = String(req.query.loc);

  db.updateImage(imgId, prodId, loc, (err, dat) => {
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
      res.status(200).send(dat);
    }
  });
});
// =============================
// ========== REVIEWS ==========
// add review
app.post('/api/ratings/reviews/insert/:pId', (req, res) => {
  const productId = Number(req.params.pId);
  const uname = String(req.query.name);
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

// get reviews
app.get('/api/ratings/reviews', (req, res) => {
  db.getReviews((err, dat) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(dat);
    }
  });
});

// gets a single review
app.get('/api/ratings/reviews/:rId', (req, res) => {
  const reviewId = Number(req.params.rId);

  db.getReviews(reviewId, (err, dat) => {
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
  const productId = Number(req.query.pId);
  const uname = String(req.query.name);
  const title = String(req.query.title);
  const date = req.query.date;
  const body = String(req.query.body);
  const starRating = Number(req.query.rating);

});

// delete a review
app.post('/api/ratings/reviews/delete/:rId', (req, res) => {

});

// =============================

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});