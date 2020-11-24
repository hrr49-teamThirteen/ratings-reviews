import React from 'react';
import styles from './Image.module.css';

const Image = ({image}) => {
  return (<img className={styles.image} src={image.loc} />);
};

export default Image;