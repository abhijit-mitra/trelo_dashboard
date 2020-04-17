import React, {memo} from 'react';
import PropTypes from 'prop-types';

const ColStyle={width: '300px', flex: 'none'};

const Column = memo(({status, children}) => {
  return (
    <div>
      <div className="py-4 px-2 gray-bg rounded mx-3 d-inline-block" style={ColStyle}>
        {status && <h5>{status}</h5>}
        {children}
      </div>
    </div>
  );
});

Column.propTypes={
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
  status: PropTypes.string.isRequired,
};

export default Column;
