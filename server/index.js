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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public/'));


// make image api route
app.get('/api/ratings/:prodId/images', (req, res) => {
  // console.log('HERE IS REQS HEADERS: ' + JSON.stringify(req.headers));
  console.log('the params on req: ' + JSON.stringify(req.params));
  fetchImages(req.params.prodId, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('this is the result of the image api: ' + result);
    res.status(200).send(result);
  });
});

app.get('/api/ratings/products', (req, res) => {
  getOne((error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    res.status(200).send(result);
  });
});

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

app.get('/api/ratings/users', (req, res) => { // PASS IN THE USERID HERE SOMEHOW
  console.log('THIS IS REQS DATA: ' + req.data);
  fetchUser(req.data.userid, (error, result) => { // PASS IT IN ON THIS LINE DUDE
    if (error) {
      console.error(error);
      return;
    }
    console.log('HEY LOOK');
    res.status(200).send(result);
  });
});

var port = 4444;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});