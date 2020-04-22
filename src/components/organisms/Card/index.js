import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {Input, Button} from '../../atoms';

const Card = memo((props) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(props.cardObj.name);
  const [deleted, setDeleted] = useState(false);

  useEffect(()=>{
    setValue(props.cardObj.name);
  }, [props.cardObj.name]);

  const handleChange = ({target: {value}})=>{
    setValue(value);
  };
  const handleEditClick = ()=>{
    setEditMode((state)=>(!state));
  };
  const handleDelete = ()=>{
    props.onCardDelete();
    setDeleted(true);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (value.length) {
      setEditMode((state)=>(!state));
      props.onEditComplete(props.listId, props.cardIndex, value);
    }
  };
  const handleDragOver=(e)=>{
    props.onDragOver(props.listId, props.cardIndex);
  };

  const handleDragStart =(e)=>{
    e.dataTransfer.effectAllowed = 'pointer';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    props.onDragStart(props.listId, props.cardIndex, props.cardObj);
  };
  if (deleted) {
    return <></>;
  }
  return (
    <div className='wrapper' onDragOver={handleDragOver}>
      <div className="card p-2 my-3 cursor-pointer"
        draggable={true}
        onDragStart={handleDragStart}
      >
        {
          editMode?
            <form className="writeMode" onSubmit={handleSubmit}>
              <div className="mb-3">
                <Input onChange={handleChange} value={value}/>
              </div>
              <div className="d-flex align-items-center">
                <div className="mr-3 d-inline-block">
                  <Button label='Save' type='submit' disabled={!value}/>
                </div>
                <i className="fas fa-times cursor-pointer" onClick={handleEditClick}></i>
              </div>
            </form>:
            <div className='readMode d-flex'>
              <div className="w-75">
                {value}
              </div>
              <div className="w-25 d-flex justify-content-end align-items-center">
                <i className="fas fa-pencil-alt cursor-pointer mr-3" onClick={handleEditClick}></i>
                <i className="far fa-trash-alt cursor-pointer" onClick={handleDelete}></i>
              </div>
            </div>
        }
      </div>
    </div>
  );
});

Card.propTypes={
  cardObj: PropTypes.object.isRequired,
  onCardDelete: PropTypes.func.isRequired,
  cardIndex: PropTypes.number.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
  onEditComplete: PropTypes.func.isRequired,
};

export default Card;
