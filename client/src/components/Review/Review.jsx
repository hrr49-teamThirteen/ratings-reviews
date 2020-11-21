import React from 'react';

const Review = ({review}) => {
  console.log(JSON.stringify(review));
  return (
    <div>
      <div>{review.username}</div>
      <div>{review.body}</div>
      <div>{review.starRating}</div>
      <div>HELPFULNESS: {review.helpfulness_score}</div>
    </div>
  );
};

export default Review;