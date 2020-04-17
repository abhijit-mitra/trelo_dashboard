import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import {Input, Button} from '../../../atoms';

const AddList = memo(({onSubmit}) => {
  const [value, setValue] = useState('');
  const [showForm, setShowForm] = useState(false);
  const handleChange=({target: {value}})=>{
    setValue(value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    onSubmit(value);
    setShowForm(false);
    setValue('');
  };
  const handleButtonClick = ()=>{
    setShowForm(true);
  };

  const handleCloseClick = ()=>{
    setShowForm(false);
  };
  return (
    <>
      {showForm ?
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Input value={value} onChange={handleChange} placeholder='Enter List Title...'/>
          </div>
          <div className="d-flex align-items-center">
            <div className="mr-3 d-inline-block">
              <Button label='Save' type='submit' disabled={!value}/>
            </div>
            <i className="fas fa-times cursor-pointer" onClick={handleCloseClick}></i>
          </div>
        </form> :
        <Button label='+ Add Another List' onClick={handleButtonClick}/>
      }
    </>
  );
});

AddList.propTypes={
  onSubmit: PropTypes.func.isRequired,
};

export default AddList;
