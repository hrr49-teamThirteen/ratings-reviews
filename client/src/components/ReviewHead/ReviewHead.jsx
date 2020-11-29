import React from 'react';
import styles from './ReviewHead.module.css';
import StarScore from '../StarScore/StarScore.jsx';
// CHECK OUT: https://www.w3schools.com/w3css/w3css_progressbar.asp
// for info on how to make the percentage meter

const ReviewHead = (props) => {
  return (
    <div>
      <h2>Guest Ratings &amp; Reviews</h2>
      <div class='star-rating-table'>
        <StarScore
          starRating = {5}
          percentage = {30}
        />
        <StarScore
          starRating = {4}
          percentage = {25}
        />
        <StarScore
          starRating = {3}
          percentage = {20}
        />
        <StarScore
          starRating = {2}
          percentage = {15}
        />
        <StarScore
          starRating = {1}
          percentage = {10}
        />
      </div>
    </div>
  );
};

export default ReviewHead;
