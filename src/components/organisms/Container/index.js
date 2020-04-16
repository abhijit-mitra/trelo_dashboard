import React from 'react';

const Container = (props) => (
  <div className='theme-bg p-5'>
    {...props.children}
  </div>
);

export default Container;
