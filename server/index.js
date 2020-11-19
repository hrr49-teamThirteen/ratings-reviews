const express = require('express');
const getOne = require('../database/index.js').getOne;
const getReviews = require('../database/index.js').getReviews;
const postReview = require('../database/index.js').postReview;
// const getAll = require('../database/index.js').getAll;

const app = express();
app.use(express.static(__dirname + '/../public/'));

app.get('/products', (req, res) => {
  getOne((error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    res.status(200).send(result);
  });
});

app.get('/reviews', (req, res) => {
  getReviews((error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    res.status(200).send(result);
  });
});

app.post('/reviews', (req, res) => {
  postReview((error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    res.status(200).send(result);
  });
});

// app.get('/products', (req, res) => {
//   getAll((error, result) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     res.status(200).send(result);
//   });
// });

var port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});