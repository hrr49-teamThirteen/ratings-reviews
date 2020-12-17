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
      prodId: 11,
      currentUser: '',
      rateableAttributes: [], // build a function in fakeData and call it here
      reviews: [],
      visibleReviews: [], // this'll start empty of course
      images: []
    };

    this.getReviews = this.getReviews.bind(this);
  }

  getImages() {
    axios.get(`/api/ratings/images/${this.state.prodId}`)
      .then(response => {
        //('this is the data of the response: ' + response.data);
        // can't I just use one setState for both?
        this.setState({images: response.data});
      }).catch(error => {
        console.error(error);
      });
  }

  getReviews() {
    axios.get(`/api/ratings/reviews/${this.state.prodId}`)
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

  async componentDidMount() {
    let item_id = window.location.pathname;
    // Remove the first forward slash
    item_id = item_id.split('');
    item_id.shift();
    item_id = item_id.join('');
    item_id = Number(item_id);

    if (item_id > 0) {
      await this.setState({prodId: item_id});
    }

    // i could get the id from the url and pass those in as arguments to these functions
    // this.getProduct();
    if (this.state.prodId) {
      await this.getImages();
      await this.getReviews();
    }
  }

  render() {
    if (this.state.reviews.length < 1) {
      return (<h3>No reviews for this product</h3>);
    } else {
      return (
        <div>
          <div>
            <ReviewHead rateableAttributes={this.state.rateableAttributes} quantityOfReviews={this.state.reviews.length}/>
          </div>
          <div>
            <ImageCarousel images={this.state.images}/>
          </div>
          <div>
            <ReviewContainer reviews={this.state.reviews} images={this.state.images}/>
          </div>
        </div>
      );
    }
  }
}

// can use csv generator to generate csv files based on tables
ReactDOM.render(<App />, document.getElementById('application'));

export default App;