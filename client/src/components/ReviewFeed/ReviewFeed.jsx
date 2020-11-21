import React from 'react';
import Review from '../Review/Review.jsx';

// CHECK OUT: https://www.w3schools.com/w3css/w3css_progressbar.asp
// for info on how to make the percentage meter

const ReviewFeed = ({reviews}) => {
  return (
    <div>
      {reviews.map(review => {
        return (<Review
          review={review}
        />);
      })}
    </div>
  );
};

export default ReviewFeed;