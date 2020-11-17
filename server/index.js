const express = require('express');
const getAll = require('../database/index.js').getAll;

const app = express();

// don't forget to serve up the static files from the public directory

app.get('/products', (req, res) => {
  getAll((error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    res.status(200).send(result);
  });
});

var port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});