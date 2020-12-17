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

  /*componentDidMount() {
    if (this.state.image === null) {
      if (Math.random() < 0.4) {
        const randImage = this.props.images[Math.floor(Math.random() * this.props.images.length)];
        this.setState({image: randImage.loc});
      }
    }
  }*/

  render() {
    console.log(this.props.review.star_rating);
    return (
      <div className = {styles.review}>
        <StarMeter score={this.props.review.star_rating} />
        <div className={styles.username}>{this.props.review.username}</div>
        <div className={styles.datePosted}>{this.props.datePosted}</div>
        <div className={styles.body}>{this.props.review.body}</div>
        {
          this.props.images.map(image => {
            console.log(image.review_id)
            if (this.props.review.id === image.review_id) {
              return <Image image={image.loc}/>
            }
          })
        }
        <HelpfulnessScore helpfulnessScore={this.state.helpfulnessScore}/>
      </div>
    );
  }
}

export default Review;