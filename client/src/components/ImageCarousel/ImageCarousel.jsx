import React from 'react';
import styles from './ImageCarousel.module.css';
import Image from '../Image/Image.jsx';

const ImageCarousel = ({images}) => {
  const imageList = images || [];
  return (
    <div>
      <h3 className={styles.carouselHeader}>Review images</h3>
      {imageList.map(image => {
        return (<Image
          image = {image.loc}
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