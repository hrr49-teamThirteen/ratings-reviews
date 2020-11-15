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
  let products = [];
  let reviews = [];
  for (let i = 0; i < n; i++) {
    products.push(fakeProduct());
    reviews.push(fakeReview());
  }
  return {products: products, reviews: reviews};
};

module.exports = fakeData;


// seed here in fake data most likely

// a couple different options?
// use sql insertion queries
// transform this fake data into a csv file, then use that to fill the database

// i don't have to worry so much about data making sense. I can just have a random bit of data