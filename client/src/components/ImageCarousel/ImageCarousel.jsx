import React from 'react';
import styles from './ImageCarousel.module.css';
import Image from '../Image/Image.jsx';

const ImageCarousel = ({images}) => {
  const imageList = images || [];
  return (
    <div>
      <h2>Review images</h2>
      {imageList.map(image => {
        return (<Image
          image = {image}
        />);
      })}
    </div>
  );
};

export default ImageCarousel;

// const ReviewFeed = ({reviews}) => {
//   console.log('HERE ARE THE REVIEWS IN REVIEWFEED: ' + JSON.stringify(reviews));
//   return (
//     <div>
//       {reviews.map(review => {
//         return (<Review
//           review={review}
//         />);
//       })}
//     </div>
//   );
// };