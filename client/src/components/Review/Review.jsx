import React from 'react';
import StarMeter from '../StarMeter/StarMeter.jsx';
import styles from './Review.module.css';
import Image from '../Image/Image.jsx';
import HelpfulnessScore from '../HelpfulnessScore/HelpfulnessScore.jsx';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      helpfulnessScore: props.helpfulnessScore
    };
  }

  componentDidMount() {
    if (this.state.image === null) {
      if (Math.random() < 0.4) {
        const randImage = this.props.images[Math.floor(Math.random() * this.props.images.length)];
        this.setState({image: randImage.loc});
      }
    }
  }

  render() {
    return (
      <div className = {styles.review}>
        <StarMeter score={this.props.review.starRating} />
        <div className={styles.username}>{this.props.review.username}</div>
        <div className={styles.datePosted}>{this.props.datePosted}</div>
        <div className={styles.body}>{this.props.review.body}</div>
        {/* <div className={styles.starRating}>STAR RATING: {review.star_rating}</div> */}
        <Image image={this.state.image}/>
        <HelpfulnessScore helpfulnessScore={this.state.helpfulnessScore}/>
      </div>
    );
  }
}

export default Review;