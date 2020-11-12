const faker = require('faker');

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

const dataBatch = fakeData(50);

console.log(JSON.stringify(dataBatch));

module.exports = {
  dataBatch
};