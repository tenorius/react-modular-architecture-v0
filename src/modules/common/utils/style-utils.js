import { css } from 'styled-components';

export const sizes = {
  xl: 1920,
  lg: 1280,
  md: 960,
  sm: 600,
  xs: 0,
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = css`@media (min-width: ${emSize}em)`;
  return accumulator;
}, {});

export default media;
