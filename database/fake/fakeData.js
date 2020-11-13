const faker = require('faker');
const mysql = require('mysql');

// add more commerce.productAdjective to this string-object?
const fakeProduct = () => {
  const newData = faker.fake('{{commerce.color}}, {{commerce.department}}, {{commerce.productName}}, {{commerce.price}}, {{commerce.productAdjective}}, {{commerce.productMaterial}}, {{commerce.product}}, {{image.image}}');
  return {color: newData[0], department: newData[1], productName: newData[2], price: newData[3], prodAdj: newData[4], prodMaterial: newData[5], product: newData[6], productImage: newData[7]};
};

const fakeReview = () => {
  const newData = faker.fake('{{internet.userName}}, {{lorem.slug}}, {{lorem.paragraph}}, {{random.number}}');
  return {username: newData[0], title: newData[1], body: newData[2], rating: newData[3]};
};

const fakeData = (n) => {
  // create an empty array
  let products = [];
  let reviews = [];
  // iterate through from 1 to n
  for (let i = 0; i < n; i++) {
    // push a fakeProduct onto the empty array
    const newProduct = fakeProduct();
    products.push(newProduct);
    const newReview = fakeReview();
    reviews.push(newReview);
  }
  // return the initial array
  return {products: products, reviews: reviews};
};

module.exports = fakeData;




// a couple different options?
// use sql insertion queries
// transform this fake data into a csv file, then use that to fill the database

// i don't have to worry so much about data making sense. I can just have a random bit of data