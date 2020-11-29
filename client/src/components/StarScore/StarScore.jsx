import React from 'react';
import styles from './StarScore.module.css';

const StarScore = (props) => {
  const starStyle = `height:15px;width:${props.percentage}`;
  return (
    <div className='starScore'>
      <div class={styles.stars}>{props.starRating} stars</div>
      <div class="bar">
        {/* how am i going to reference the props within the inline styling? */}
        <div class="filled" style={starStyle}></div>
      </div>
      <div class='star-percentage'>35%</div>
    </div>
  );
};

export default StarScore;
{ /* <div class={styles.stars}>5 stars</div>
<div class={styles.stars}>4 stars</div>
<div class={styles.stars}>3 stars</div>
<div class={styles.stars}>2 stars</div>
<div class={styles.stars}>1 star</div>
<div class='star-percentage'>35%</div>
<div class='star-percentage'>25%</div>
<div class='star-percentage'>20%</div>
<div class='star-percentage'>10%</div>
<div class='star-percentage'>10%</div> */ }