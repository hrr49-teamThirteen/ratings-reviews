// deprecated, only use as a reference! run json/export.js and json/import.js
// original function was to import csv
const mongoose = require('mongoose');

// Connection:
mongoose.connect('mongodb://localhost:27017/reviewsdb', { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => handleError(error));

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Schemnas:
const usersSchema = new mongoose.Schema({
  user_id: {type: Number, index: {unique: true}},
  name:    String
});
const userModel = mongoose.model('Users', usersSchema);

const productsSchema = new mongoose.Schema({
    product_id:   {type: Number, index: {unique: true}},
    product_name: String,
    reviews:      [{title: String, date: String, date: String, body: String, star_rating: Number, user_id: Number}],
    images:       [String]
});
const productsModel = mongoose.model('Products', productsSchema);

// Populate database from CSV
const fs = require('fs');
const readline = require('readline');
async function processLineByLine(file, cb) {
  console.log(`${file}`);
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let header = true;
  for await (const line of rl) {
    if (header) {
      header = false;
    } else {
      await cb(line.split(','));
    }
  }
}

new Promise((res, rej) => {
  return processLineByLine('/home/user/Downloads/ratings-reviews/database/seeders/csv/products.csv', (args) => {
    return productsModel.create({product_id: Number(args[0]), product_name: String(args[1])});
  });
  res();
}).then((res) => {
  return processLineByLine('/home/user/Downloads/ratings-reviews/database/seeders/csv/users.csv', (args) => {
      return userModel.create({user_id: Number(args[0]), name: String(args[1])});
  });
})
.then((res) => {
  return processLineByLine('/home/user/Downloads/ratings-reviews/database/seeders/csv/images.csv', (args) => {
    return productsModel.updateOne({ product_id: args[1] }, { $push: { images: String(args[0]) } });
  });
})
.then((res) => {
  return processLineByLine('/home/user/Downloads/ratings-reviews/database/seeders/csv/reviews.csv', (args) => {
    return productsModel.updateOne({ product_id: args[5] }, { $push: { reviews: {
      title:        String(args[0]),
      date:         String(args[1]),
      body:         String(args[2]),
      star_rating:  Number(args[3]),
      user_id:      Number(args[4])
    }}});
  });
}).then(() => {
  console.log('Done!');
});