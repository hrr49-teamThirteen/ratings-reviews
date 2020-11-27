import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// import getProduct from './getProduct.js';
import ReviewHead from './src/components/ReviewHead/ReviewHead.jsx';
import ReviewContainer from './src/components/ReviewContainer/ReviewContainer.jsx';
import ImageCarousel from './src/components/ImageCarousel/ImageCarousel.jsx';

class App extends React.Component {
  constructor(props) { // I need to somehow pass the dataSeed into props here!
    super(props);

    this.state = {
      prodId: 1,
      currentUser: '',
      rateableAttributes: [], // build a function in fakeData and call it here
      reviews: [],
      visibleReviews: [], // this'll start empty of course
      images: [] // this will be set randomly with fakeData
    };
  }

  getImages() {
    axios.get(`/api/ratings/${this.state.prodId}/images`)
      .then(response => {
        // can't I just use one setState for both?
        this.setState({images: response.data});
      }).catch(error => {
        console.error(error);
      });
  }



  // getProduct() {
  //   // get product should be to a particular prodId
  //   // there's a way to grab the prod id off the url itself and save myself some trouble as far as state
  //   axios.get('/api/products')
  //     .then(response => {
  //       // can't I just use one setState for both?
  //       this.setState({prodId: response.data.id});
  //       this.setState({rateableAttributes: response.data.rateableAttributes});
  //       // this.setState({images: response.images});
  //     }).catch(error => {
  //       console.error(error);
  //     });
  // }

  getReviews() {
    axios.get('/api/ratings/reviews')
      .then(response => {
        // what the heck's this bonus promise about?
        new Promise((resolve, reject) => {
          resolve(response);
        }).then((response) => {
          this.setState({reviews: response.data}); // can i change this to be response.reviews on the server side?
        });
      }).catch(error => {
        reject(error);
      });
  }

  postReview() {
    // gotta make this work asyncronously
    const response = axios.post('/api/ratings/reviews');
    let reviews = this.state.reviews;
    let visibleReviews = this.state.visibleReviews;
    reviews.unshift(response.body);
    visibleReviews.unshift(response.body);
    this.setState({
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

  componentDidMount() {
    // i could get the id from the url and pass those in as arguments to these functions
    // this.getProduct();
    this.getReviews();
    this.getImages();
  }

  render() { // just get the getReviews data elsewhere
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
          <ReviewContainer
            reviews = {this.state.reviews} // gonna want this to be visible reviews eventually
            images = {this.state.images}
          />
        </div>
      </div>
    );
  }
}

// can use csv generator to generate csv files based on tables
ReactDOM.render(<App />, document.getElementById('application'));

export default App;