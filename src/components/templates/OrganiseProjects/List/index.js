import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import {Button} from '../../../atoms';
import {Card, Column} from '../../../organisms';
import NewCard from './NewCard';

const List = memo(({status, cardData, listId, onSubmit}) => {
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
      {(Object.entries(cardData)||[]).map(([cardKey, cardValue])=>(
        <Card key={cardKey} value={cardValue}/>
      ))}
      {
        openNewCard?
          <NewCard onSubmit={handleSubmit} listId={listId} onCloseClick={handleCloseClick}/>:
          <Button label='+ Add Card' onClick={handleButtonClick}/>
      }
    </Column>
  );
});

List.propTypes={
  children: PropTypes.element.isRequired,
  status: PropTypes.string.isRequired,
  cardData: PropTypes.object.isRequired,
  listId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default List;
