import React from 'react';
import styles from './Image.module.css';

const Image = ({image}) => {
  return (<div className={styles.imgContainer}>
    <img className={styles.image} src={image.loc} />
  </div>);
};

export default Image;