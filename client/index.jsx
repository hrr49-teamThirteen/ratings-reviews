import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import getProduct from './getProduct.js';
import ReviewHead from './components/ReviewHead.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      reviews: [],
      images: []
    };
  }

  async getProduct() {
    const response = await axios.get('/products');
    this.state.product = response.data;
  }

  // getReviews() {
  //   axios.get('');
  // }

  render() {
    return (
      <div>
        <div>
          <ReviewHead
            product = {this.state.product}
            reviews = {this.state.reviews}
          />
        </div>
        <div>
          <ImageCarousel
            images = {this.state.images}
          />
        </div>
        <div>
          <ReviewFeed
            product = {this.state.product}
            reviews = {this.state.reviews}
            images = {this.state.images}
          />
        </div>
      </div>
    );
  }
}

// can use csv generator to generate csv files based on tables