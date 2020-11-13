const React = require('react');
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    };
  }

  get() {
    axios.get('');
  }
}

// can use csv generator to generate csv files based on tables