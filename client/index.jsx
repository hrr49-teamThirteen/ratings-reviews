import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// import getProduct from './getProduct.js';
import ReviewHead from './src/components/ReviewHead/ReviewHead.jsx';
import ReviewContainer from './src/components/ReviewContainer/ReviewContainer.jsx';

class App extends React.Component {
  constructor(props) { // I need to somehow pass the dataSeed into props here!
    super(props);

    this.state = {
      currentUser: 'Morgan Morbid',
      rateableAttributes: ['Shape', 'Intensity', 'Fear Factor', 'Secretiveness', 'Sinister Power'], // build a function in fakeData and call it here
      reviews: [{ // I'll want this to be based in a server request
        'id': 3,
        'userid': null,
        'body': 'THIS IS A REVIEW!!',
        'star_rating': 5,
        'helpfulness_score': null,
        'image_id': null
      }],
      visibleReviews: [{ // I'll want this to be based in a server request
        'id': 3,
        'userid': null,
        'body': 'THIS IS A REVIEW!!',
        'star_rating': 5,
        'helpfulness_score': null,
        'image_id': null
      }], // this'll start empty of course
      images: [] // this will be set randomly with fakeData
    };
  }

  getProduct() {
    const response = axios.get('/products');
    this.setState({rateableAttributes: response.rateableAttributes});
    this.setState({images: response.images});
  }

  getReviews() {
    axios.get('/reviews')
      .then((response) => {
        this.setState({reviews: response.data}); // can i change this to be response.reviews on the server side?
      });
  }

  postReview() {
    const response = axios.post('/reviews');
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
    // do I need to make this a promise?
    console.log('Did I make it here before the errors?');
    this.getReviews();
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
console.log('GREETINGS FROM BEFORE THE REACTDOM RENDER');
ReactDOM.render(<App />, document.getElementById('app'));

export default App;