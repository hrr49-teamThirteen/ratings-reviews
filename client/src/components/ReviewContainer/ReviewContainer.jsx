import React from 'react';
import ReviewFilter from '../ReviewFilter/ReviewFilter.jsx';
import ReviewFeed from '../ReviewFeed/ReviewFeed.jsx';

// CHECK OUT: https://www.w3schools.com/w3css/w3css_progressbar.asp
// for info on how to make the percentage meter

const ReviewContainer = (props) => {
  return (
    <div>
      <ReviewFilter/>
      <ReviewFeed
        reviews = {props.reviews}
      />
    </div>
  );
};

export default ReviewContainer;
