import React from 'react';
import PropTypes from 'prop-types';

const Button = ({label, ui_type, ...rest}) => (
  <button type="button" className={`btn btn-${ui_type}`} {...rest}>{label}</button>
);

Button.propTypes={
  label: PropTypes.string.isRequired,
  ui_type: PropTypes.oneOf(['success', 'light']),
};

Button.defaultProps={
  ui_type: 'success',
};

export default Button;
