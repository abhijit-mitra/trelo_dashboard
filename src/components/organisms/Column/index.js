import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';

import {Button} from '../../atoms';
import Card from '../Card';
import NewCard from '../NewCard';

const ColStyle={width: '300px', flex: 'none'};

const Column = memo(({status, cardData, listId, onSubmit}) => {
  const [openNewCard, setOpenNewCard] = useState(true);
  const handleButtonClick = ()=>{
    setOpenNewCard(true);
  };
  const handleSubmit = (obj)=>{
    setOpenNewCard(false);
    onSubmit(obj);
  };

  return (
    <div>
      <div className="py-4 px-2 gray-bg rounded mx-3 d-inline-block" style={ColStyle}>
        <h5>{status}</h5>
        {(Object.entries(cardData)||[]).map(([cardKey, cardValue])=>(
          <Card key={cardKey} value={cardValue}/>
        ))}
        {
          openNewCard?
            <NewCard onSubmit={handleSubmit} listId={listId}/>:
            <Button label='+ Add Another Card' onClick={handleButtonClick}/>
        }
      </div>
    </div>
  );
});

Column.propTypes={
  children: PropTypes.element.isRequired,
  status: PropTypes.string.isRequired,
  cardData: PropTypes.object.isRequired,
  listId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Column;
