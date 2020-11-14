const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsDB'
});

// create the functions

connection.connect();


// think back to databases sprint for more info on promises and how to return them
// create a new promise that
// resolve the promise, and then you can chain into then
const getAll = (callback) => {

  connection.query('SELECT * FROM products', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(null, result);
  });
};

// module export those functions
module.exports = {
  getAll
};