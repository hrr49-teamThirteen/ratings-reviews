const faker = require('faker');
const mysql = require('mysql');

// add more commerce.productAdjective to this string-object?
const fakeProduct = () => {
  return new Promise((resolve, reject) => {
    resolve(newData = faker.fake('{{commerce.color}}, {{commerce.department}}, {{commerce.productName}}, {{commerce.price}}, {{commerce.productAdjective}}, {{commerce.productMaterial}}, {{commerce.product}}, {{image.image}}'));
  }).then((error, result) => {
    if (error) {
      throw error;
    }
    result = result.split(',');
    return {color: result[0], department: result[1], productName: result[2], price: result[3], prodAdj: result[4], prodMaterial: result[5], product: result[6], productImage: result[7]};
  }).catch(error => {
    console.error(error);
  });
};

const fakeReview = () => {
  return new Promise((resolve, reject) => {

    resolve(faker.fake('{{internet.userName}}, {{lorem.slug}}, {{lorem.paragraph}}, {{random.number}}'));
  }).then((error, result) => {
    if (error) {
      throw error;
    }
    result = result.split(',');
    console.log('HERES THE RESULT: ' + result);
    return {username: result[0], title: result[1], body: result[2], rating: result[3]};
  }).catch(error => {
    console.error(error);
  });
};

const fakeData = (n) => {
  // create an empty array
  let products = [];
  let reviews = [];
  // iterate through from 1 to n
  for (let i = 0; i < n; i++) {
    // push a fakeProduct onto the empty array
    return new Promise((resolve, reject) => {

      resolve({product: fakeProduct(), review: fakeReview()});
    }).then((error, result) => {
      if (error) {
        throw error;
      }
      products.push(result.product);
      reviews.push(result.review);
    });
  }
  // return the initial array
  console.log('HERE ARE THE PRODUCTS: ' + JSON.stringify(products));
  console.log('HERE ARE THE REVIEWS: ' + JSON.stringify(reviews));
  console.log('HERE IS THE LENGTH OF PRODUCTS: ' + products.length);
  console.log('HERE IS THE LENGTH OF REVIEWS: ' + reviews.length);
  console.log('HERE IS THE TYPE OF AN ITEM IN PRODUCTS: ' + typeof products[0]);
  console.log('THIS IS THE FIRST ITEM IN PRODUCTS: ' + products[0]);

  return {products: products, reviews: reviews};
};

module.exports = fakeData;


// seed here in fake data most likely

// a couple different options?
// use sql insertion queries
// transform this fake data into a csv file, then use that to fill the database

// i don't have to worry so much about data making sense. I can just have a random bit of data