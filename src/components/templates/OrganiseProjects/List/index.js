import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import {Button} from '../../../atoms';
import {Card, Column} from '../../../organisms';
import NewCard from './NewCard';

const List = memo(({status, cardData, listId, onSubmit, onDragStart, onDragOver}) => {
  const [openNewCard, setOpenNewCard] = useState(false);
  const handleButtonClick = ()=>{
    setOpenNewCard(true);
  };
  const handleSubmit = (obj)=>{
    setOpenNewCard(false);
    onSubmit(obj);
  };
  const handleCloseClick=()=>{
    setOpenNewCard(false);
  };
  return (
    <Column status={status}>
      <div>
        {cardData.map((elm, index)=>(
          <Card
            key={index}
            cardIndex={index}
            cardObj={elm}
            listId={Number(listId)}
            onCardDelete={()=>{}}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
          />
        ))}
        {
          openNewCard?
            <NewCard onSubmit={handleSubmit} listId={Number(listId)} onCloseClick={handleCloseClick}/>:
            <Button label='+ Add Card' onClick={handleButtonClick}/>
        }
      </div>
    </Column>
  );
});

List.propTypes={
  status: PropTypes.string.isRequired,
  cardData: PropTypes.array.isRequired,
  listId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
};

export default List;
