const faker = require('faker');
const fs = require('fs');

const baseCsvDir = './database/seeders/csv/'
const productCount = 10000000;
const variance = getRandomIntRange(2, 5);
const imageCount = (productCount * variance);
const usersCount = getRandomIntRange((productCount / variance), productCount);
const reviewsCount = getRandomIntRange(((usersCount * variance) / variance), (usersCount * variance));

function getRandomIntRange(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}

// Generate products.csv
console.log(`Generating ${productCount} products to ${baseCsvDir}products.csv`);
function getProductsRow() {
  return `${faker.commerce.productName()}\n`;
}

const productsWriteStream = fs.createWriteStream(`${baseCsvDir}products.csv`);
(async() => {
  for(let i = 0; i < productCount; i++) {
      if(!productsWriteStream.write(getProductsRow())) {
          await new Promise(resolve => productsWriteStream.once('drain', resolve));
      }
  }
  productsWriteStream.close();

  // Generate users.csv
  console.log(`Generating ${usersCount} users to ${baseCsvDir}users.csv`);
  function getUsersRow() {
    return `${faker.internet.userName()}\n`;
  }

  const usersWriteStream = fs.createWriteStream(`${baseCsvDir}users.csv`);
  (async() => {
    for(let i = 0; i < productCount; i++) {
        if(!usersWriteStream.write(getUsersRow())) {
            await new Promise(resolve => usersWriteStream.once('drain', resolve));
        }
    }
    usersWriteStream.close();

    // Generate images.csv
    function getImagesRow() {
      return `${faker.image.image()},${getRandomIntRange(0, productCount)}\n`;  // faker image used by original repo
    }

    const imagesWriteStream = fs.createWriteStream(`${baseCsvDir}images.csv`);
    console.log(`Generating ${imageCount} images to ${baseCsvDir}images.csv`);
    (async() => {
      for(let i = 0; i < productCount; i++) {
          if(!imagesWriteStream.write(getImagesRow())) {
              // Will pause every 16384 iterations until `drain` is emitted
              await new Promise(resolve => imagesWriteStream.once('drain', resolve));
          }
      }
      imagesWriteStream.close();

      // Generate reviews.csv
      function getReviewsRow() {
        // title, date, body, rating, user_id, prod_id
        const title = faker.lorem.sentence().replace(/,/g, ''); // remove commas in fake sentences for csv
        const date = faker.date.soon(90);
        const body = faker.lorem.sentences(getRandomIntRange(1, 5)).replace(/,/g, '');
        const rating = getRandomIntRange(1, 5);
        const uid = getRandomIntRange(0, usersCount);
        const pid = getRandomIntRange(0, productCount);

        return `${title},${date},${body},${rating},${uid},${pid}\n`;
      }

      const reviewsWriteStream = fs.createWriteStream(`${baseCsvDir}reviews.csv`);
      (async() => {
        console.log(`Generating ${reviewsCount} reviews to ${baseCsvDir}reviews.csv\nThis will take a long time...`);
        for(let i = 0; i < productCount; i++) {
            if(!reviewsWriteStream.write(getReviewsRow())) {
                await new Promise(resolve => reviewsWriteStream.once('drain', resolve));
            }
        }
        reviewsWriteStream.close();
        console.log('Done!');
      })();
    })();
  })();
})();


