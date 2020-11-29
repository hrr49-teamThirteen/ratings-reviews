import React from 'react';
import styles from './Image.module.css';

const Image = ({image}) => {
  console.log('LOGGING THE IMAGE: ' + image);
  if (image !== null) {
    console.log('MADE IT INSIDE!');
    return (<div className={styles.imgContainer}>
      <img className={styles.image} src={image} />
    </div>);
  } else {
    console.log('DIDNT MAKE IT!');
    return null;
  }
};

export default Image;