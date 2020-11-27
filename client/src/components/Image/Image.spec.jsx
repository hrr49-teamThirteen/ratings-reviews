import * as React from 'react';
import {render} from '@testing-library/react';
import ReactDOM from 'react-dom';
import Image from './Image.jsx';

test('renders an image to the dom', () => {
  const root = document.createElement('div');
  let imageComponent = Image({image: 'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'});
  ReactDOM.render(imageComponent, root);
  expect(root.querySelector('img')).not.toBe(undefined);
  // expect(root.querySelector('img').props.image).toBe('https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png');
});