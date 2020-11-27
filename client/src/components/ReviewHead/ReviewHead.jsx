import React from 'react';
import styles from './ReviewHead.module.css';
import StarScore from '../StarScore/StarScore.jsx';
// CHECK OUT: https://www.w3schools.com/w3css/w3css_progressbar.asp
// for info on how to make the percentage meter

const ReviewHead = (props) => {
  return (
    <div>
      <h1>Guest Ratings and Reviews</h1>
      <div class='star-rating-table'>
        <StarScore
          starRating = {5}
          percentage = {30}
        />
      </div>
    </div>
  );
};

export default ReviewHead;
