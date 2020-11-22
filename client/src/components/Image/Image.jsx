import React from 'react';
// import styles from './Image.module.css';

const Image = ({image}) => {
  console.log('heres the image at the deepest level: ' + image);
  console.log('heres the data type of the image: ' + typeof image);
  return (<img src={image.loc} />);
};

export default Image;