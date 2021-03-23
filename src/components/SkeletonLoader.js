import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader = (props) => (
  <ContentLoader
    speed={2}
    width={props.width}
    height={props.height}
    backgroundColor='#212121'
    foregroundColor='#383838'
    {...props}
  >
    <rect
      x='0'
      y='0'
      rx={props.radius}
      ry={props.radius}
      width={props.width}
      height={props.height}
    />
  </ContentLoader>
);

export default SkeletonLoader;
