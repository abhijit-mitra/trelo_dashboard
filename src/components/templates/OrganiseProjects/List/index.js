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
  const entries = Object.entries(cardData);
  const sortedList = entries.sort((a, b)=>(a[1].order-b[1].order));
  return (
    <Column status={status}>
      <div>
        {sortedList.map(([cardKey, cardObj])=>(
          <Card
            key={cardKey}
            cardId={Number(cardKey)}
            cardObj={cardObj}
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
  cardData: PropTypes.object.isRequired,
  listId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
};

export default List;
