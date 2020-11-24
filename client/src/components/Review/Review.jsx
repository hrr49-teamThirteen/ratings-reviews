import React from 'react';
import StarMeter from '../StarMeter/StarMeter.jsx';

const Review = ({review}) => {
  return (
    <div>
      {/* <StarMeter score={review.starRating} /> */}
      <div>{review.username}</div>
      <div>{review.body}</div>
      <div>{review.starRating}</div>
      <div>HELPFULNESS: {review.helpfulness_score}</div>
    </div>
  );
};

export default Review;