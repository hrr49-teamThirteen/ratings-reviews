const faker = require('faker');
const mysql = require('mysql');

// add more commerce.productAdjective to this string-object?
const fakeProduct = () => {
  let newProduct = faker.fake('{{commerce.color}}, {{commerce.department}}, {{commerce.productName}}, {{commerce.price}}, {{commerce.productAdjective}}, {{commerce.productMaterial}}, {{commerce.product}}, {{image.image}}');
  newProduct = newProduct.split(',');
  return {color: newProduct[0], department: newProduct[1], productName: newProduct[2], price: newProduct[3], prodAdj: newProduct[4], prodMaterial: newProduct[5], product: newProduct[6], productImage: newProduct[7]};
};

// const fakeProduct = () => {
//   return new Promise((resolve, reject) => {
//     resolve(newData = faker.fake('{{commerce.color}}, {{commerce.department}}, {{commerce.productName}}, {{commerce.price}}, {{commerce.productAdjective}}, {{commerce.productMaterial}}, {{commerce.product}}, {{image.image}}'));
//   }).then((error, result) => {
//     if (error) {
//       throw error;
//     }
//     result = result.split(',');
//     console.log('Result is of type: ' + typeof result);
//     return {color: result[0], department: result[1], productName: result[2], price: result[3], prodAdj: result[4], prodMaterial: result[5], product: result[6], productImage: result[7]};
//   }).catch(error => {
//     console.error(error);
//   });
// };

const fakeImage = () => {
  return faker.image.image();
};

const fakeAttribute = () => {
  return faker.commerce.productAdjective();
};

const fakeUser = () => {
  return faker.internet.userName();
};

const fakeReview = () => {
  return faker.fake('{{internet.userName}}, {{lorem.slug}}, {{lorem.paragraph}}, {{time.recent}}');
};

const fakeData = (n) => {
  console.log('I MADE IT INTO FAKEDATA!');
  // create an empty array
  let products = [];
  let reviews = [];
  let attributes = [];
  let users = [];
  let images = [];
  // iterate through from 1 to n
  for (let i = 0; i < n; i++) {
    console.log('MADE IT INTO THE FOR LOOP!');
    // push a fakeProduct onto the empty array
    products.push(fakeProduct());
    console.log('PRODUCTS IS CURRENTLY: ' + JSON.stringify(products));
    reviews.push(fakeReview());
    console.log('FIRST REVIEW IS CURRENTLY: ' + JSON.stringify(reviews)[0]);
    users.push(fakeUser());
  }
  for (let i = 0; i < 5 * n; i++) {
    images.push(fakeImage());
  }
  for (let i = 0; i < 5; i++) {
    attributes.push(fakeAttribute());
  }
  return {products: products, reviews: reviews, attributes: attributes, users: users, images: images};
};

module.exports = fakeData;


// seed here in fake data most likely

// a couple different options?
// use sql insertion queries
// transform this fake data into a csv file, then use that to fill the database

// i don't have to worry so much about data making sense. I can just have a random bit of data