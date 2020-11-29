import React from 'react';
import styles from './HelpfulnessScore.module.css';

const HelpfulnessScore = (props) => {
  if (props.helpfulnessScore === 0) {
    return (
      <div className={styles.score}>Did you find this review helpful?</div>
    );
  } else if (props.helpfulnessScore === 1) {
    return (
      <div className={styles.score}>{props.helpfulnessScore} user found this review helpful. Did you?</div>
    );
  } else {
    return (
      <div className={styles.score}>{props.helpfulnessScore} users found this review helpful. Did you?</div>
    );
  }
};

export default HelpfulnessScore;