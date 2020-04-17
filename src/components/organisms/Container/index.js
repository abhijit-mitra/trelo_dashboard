import React, {memo} from 'react';
import PropTypes from 'prop-types';

const Container = memo(({children}) => (
  <div className='theme-bg p-5 vh-100 vw-100 position-absolute'>
    <div className="d-flex overflow-auto h-100">
      {children}
    </div>
  </div>
));

Container.propTypes={
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
};

export default Container;
