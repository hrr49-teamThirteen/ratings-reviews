const express = require('express');
const bodyParser = require('body-parser');
const getOne = require('../database/index.js').getOne;
const getReviews = require('../database/index.js').getReviews;
const postReview = require('../database/index.js').postReview;
const createUser = require('../database/index.js').createUser;
// const getAll = require('../database/index.js').getAll;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// don't forget to serve up the static files from the public directory

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
  postReview(req.body, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('RESULT RETURNING FROM REVIEWS POST ENDPOINT: ' + JSON.stringify(result));
    res.status(200).send(result);
  });
});

app.post('/users', (req, res) => {
  console.log('ABOUT TO CREATE A USER!');
  createUser(req.body, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('RESULT RETURNING FROM USERS POST ENDPOINT: ' + JSON.stringify(result));
    // what exactly should I send back on the response? It all seems to return the same way regardless
    res.status(200).send(req.body);
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