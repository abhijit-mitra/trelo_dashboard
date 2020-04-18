import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import {Input, Button} from '../../../atoms';

const NewCard = memo((props) => {
  const [value, setValue] = useState('');
  const handleChange=({target: {value}})=>{
    setValue(value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    props.onSubmit({value, listId: props.listId});
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3">
        <Input onChange={handleChange} value={value} placeholder='Enter Card Title...' autoFocus/>
      </div>
      <div className="d-flex align-items-center">
        <div className="mr-3 d-inline-block">
          <Button label='Save' type='submit' disabled={!value}/>
        </div>
        <i className="fas fa-times cursor-pointer" onClick={props.onCloseClick}></i>
      </div>
    </form>
  );
},
);

NewCard.propTypes={
  onSubmit: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default NewCard;
