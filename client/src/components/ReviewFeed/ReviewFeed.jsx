import React from 'react';
import Review from '../Review/Review.jsx';

// CHECK OUT: https://www.w3schools.com/w3css/w3css_progressbar.asp
// for info on how to make the percentage meter

const ReviewFeed = (props) => {
  console.log(props.images);
  return (
    <div>
      {props.reviews.map(review => {
        return (<Review
          review={review}
          images={props.images}
        />);
      })}
    </div>
  );
};

export default ReviewFeed;