const faker = require('faker');
const fs = require('fs');
const aws = require('../../../aws.js');
const baseCsvDir = './database/seeders/json/'
const productCount = 10000000;
const variance = getRandomIntRange(2, 5);
const usersCount = getRandomIntRange((productCount / variance), productCount);


console.log('You should only be using this script if you will import this manually in mongodb');

function getRandomIntRange(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}

function getReviews() {
  const count = getRandomIntRange(0, 10);
  const reviews = [];

  for (let i = 0; i < count; i++) {
    const title = faker.lorem.sentence().replace(/,/g, ''); // remove commas in fake sentences for csv
    const date = faker.date.soon(90);
    const body = faker.lorem.sentences(getRandomIntRange(1, 5)).replace(/,/g, '');
    const star_rating = getRandomIntRange(1, 5);
    const user_id = getRandomIntRange(1, usersCount);
    reviews.push({review_id: (i + 1), title: title, date: date, body: body, star_rating: star_rating, user_id: user_id, images: getImages()});
  }

  return reviews;
}

function getImages() {
  const count = getRandomIntRange(0, 5);
  const images = [];

  for (let i = 1; i < count; i++) {
    const img = {image_id: (i + 1), loc: `${aws.url}/images/${getRandomIntRange(1, 60)}.webp`};
    images.push(img);
  }

  return images;
}

function getProductsRow(index) {
  const product_id = index;
  const product_name = faker.commerce.productName();
  const reviews = getReviews();

  return {product_id: product_id, product_name: product_name, reviews: reviews};
}


console.log(`Generating ${productCount} products, with reviews and images, to ${baseCsvDir}products.json... this will take a long time!`);
const productsWriteStream = fs.createWriteStream(`${baseCsvDir}products.json`);
(async() => {
  for(let i = 1; i <= productCount; i++) {
      if(!productsWriteStream.write(JSON.stringify(getProductsRow(i)))) {
          await new Promise(resolve => productsWriteStream.once('drain', resolve));
      }
  }
  productsWriteStream.close();

  // Generate users.json
  console.log(`Generating ${usersCount} users to ${baseCsvDir}users.json`);
  function getUsersRow(index) {
    const user_id = index;
    const name = faker.internet.userName();
    return {user_id: user_id, name: name};
  }

  const usersWriteStream = fs.createWriteStream(`${baseCsvDir}users.json`);
  (async() => {
    for(let i = 1; i <= usersCount; i++) {
        if(!usersWriteStream.write(JSON.stringify(getUsersRow(i)))) {
            await new Promise(resolve => usersWriteStream.once('drain', resolve));
        }
    }
    console.log('Done!\nImport with these commands:\nmongoimport --db reviewsdb --collection products --file products.json\ndb.products.createIndex({product_id: -1})\nmongoimport --db reviewsdb --collection users --file users.json\ndb.users.createIndex({user_id: -1})');
    usersWriteStream.close();
  })();
})();


