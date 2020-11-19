import React from 'react';

const Review = ({review}) => {
  console.log(JSON.stringify(review));
  return (
    <div>
      SAM GOLDIE
      <div>{review.username}</div>
      <div>{review.body}</div>
      <div>{review.starRating}</div>
      <div>{review.helpfulnessRating}</div>
    </div>
  );
};

export default Review;