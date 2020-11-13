const faker = require('faker');

// add more commerce.productAdjective to this string-object?
const fakeProduct = () => {
  return faker.fake('{{commerce.color}}, {{commerce.department}}, {{commerce.productName}}, {{commerce.price}}, {{commerce.productAdjective}}, {{commerce.productMaterial}}, {{commerce.product}}');
};

const fakeData = (n) => {
  // create an empty array
  let results = [];
  // iterate through from 1 to n
  for (let i = 0; i < n; i++) {
    // push a fakeProduct onto the empty array
    const newProduct = fakeProduct();
    results.push(newProduct);
  }
  // return the initial array
  return results;
};

const dataBatch = fakeData(30);



console.log(JSON.stringify(dataBatch));

module.exports = {
  fakeData,
  dataBatch
};

// a couple different options?
// use sql insertion queries
// transform this fake data into a csv file, then use that to fill the database

// i don't have to worry so much about data making sense. I can just have a random bit of data