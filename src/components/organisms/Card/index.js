import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import {Input, Button} from '../../atoms';

const Card = memo((props) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(props.value);

  const handleChange = ({target: {value}})=>{
    setValue(value);
  };
  const handleEditClick = ()=>{
    setEditMode((state)=>(!state));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (value.length) {
      setEditMode((state)=>(!state));
    }
  };
  return (
    <div className="card p-3 my-3">
      {
        editMode?
          <form className="writeMode" onSubmit={handleSubmit}>
            <div className="mb-3">
              <Input onChange={handleChange} value={value}/>
            </div>
            <Button label='Save' type='submit'/>
          </form>:
          <div className='readMode d-flex'>
            <div className="w-75">
              {value}
            </div>
            <div className="w-25 d-flex justify-content-end align-items-center">
              <i className="fas fa-pencil-alt cursor-pointer" onClick={handleEditClick}></i>
            </div>
          </div>
      }
    </div>
  );
});

Card.propTypes={
  value: PropTypes.string.isRequired,
};

export default Card;
