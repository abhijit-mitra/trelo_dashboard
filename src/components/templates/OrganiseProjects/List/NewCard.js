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
        <Input onChange={handleChange} value={value}/>
      </div>
      <Button label='Save' type='submit' disabled={!value}/>
    </form>
  );
},
);

NewCard.propTypes={
  onSubmit: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
};

export default NewCard;
