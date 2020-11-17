import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import getProduct from './getProduct.js';
import ReviewHead from './components/ReviewHead.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rateableAttributes: [],
      reviews: [],
      visibleReviews: [],
      images: []
    };
  }

  async getProduct() {
    const response = await axios.get('/products');
    this.state.rateableAttributes = response.rateableAttributes;
    this.state.images = response.images;
  }

  async getReviews() {
    const response = await axios.get('/reviews');
    this.state.reviews = response.reviews;
  }

  async postReview() {
    const response = await axios.post('reviews');
    let reviews = this.state.reviews;
    let visibleReviews = this.state.visibleReviews;
    reviews.unshift(response.body);
    visibleReviews.unshift(response.body);
    setState({
      reviews: reviews,
      visibleReviews: visibleReviews
    });
  }

  showReviews(quantity) {
    // make a copy of state.visibleReviews as a variable
    // for a number of times equal to quantity
    // push the item from this.reviews at an index equal to the length of visibleReviews onto the variable copy of visibleReviews
    // set state.visibleReviews equal to the copy
  }

  // adjustHelpfulness(value) {
  //   event.target.value += value;
  // }

  // getReviews() {
  //   axios.get('');
  // }

  render() {
    return (
      <div>
        <div>
          <ReviewHead
            rateableAttributes = {this.state.rateableAttributes}
            quantityOfReviews = {this.state.reviews.length}
          />
        </div>
        <div>
          <ImageCarousel
            images = {this.state.images}
          />
        </div>
        <div>
          <ReviewFeed
            reviews = {this.state.reviews}
            images = {this.state.images}
          />
        </div>
      </div>
    );
  }
}
// can use csv generator to generate csv files based on tables