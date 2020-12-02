// refactor to go to /api/endpoint

// GAME PLAN FOR TODAY AND TOMORROW
// MIGHT BE WORTH IT TO CREATE A HARD CODED VERSION WITH PRODID1, AND I CAN PASS THAT TO MY TEAM
// SPEND TWO THIRDS OF A DAY GETTING TESTS GOING
// don't forget to email communications

const express = require('express');
const bodyParser = require('body-parser');
const getOne = require('../database/index.js').getOne;
const getReviews = require('../database/index.js').getReviews;
const postReview = require('../database/index.js').postReview;
const fetchUser = require('../database/index.js').fetchUser;
const fetchImages = require('../database/index.js').fetchImages;

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
  // console.log('HERE IS REQS HEADERS: ' + JSON.stringify(req.headers));
  //console.log('the params on req: ' + JSON.stringify(req.params));
  fetchImages(req.params.prodId, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    //console.log('this is the result of the image api: ' + result);
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

app.get('/api/ratings/reviews', (req, res) => {
  getReviews((error, result) => {
    if (error) {
      console.error(error);
      return;
    }

    res.status(200).send(result);
  });
});

app.post('/api/ratings/reviews', (req, res) => {
  postReview((error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    res.status(200).send(result);
  });
});



var port = 4444;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});