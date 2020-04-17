import React, {memo, useState} from 'react';
import {Container, Column} from '../../organisms';
import List from './List';
import AddList from './AddList';
import {initialState} from './initialState';

const OrganiseProjects = memo((props) => {
  const [state, setState] = useState(initialState);
  let draggedItem;
  const handleNewCardSubmit=(obj)=>{
    const order = Object.entries(state[obj.listId].cards).length;
    setState((state)=>({
      ...state,
      [obj.listId]: {
        ...state[obj.listId],
        cards: {
          ...state[obj.listId].cards,
          [Number(new Date().getTime())]: {
            name: obj.value,
            order,
          },
        },
      },
    }));
  };
  const handleNewListSubmit=(value)=>{
    setState((state)=>({
      ...state,
      [Number(new Date().getTime())]: {
        name: value,
        cards: {},
      },
    }));
  };
  const handleDragStart = (cardId)=>{
    draggedItem = cardId;
  };
  const handleDragOver = (listId, cardId)=>{
    const draggedOverItem = cardId;
    // if the item is dragged over itself, ignore
    if (!draggedItem || draggedItem === draggedOverItem) {
      return;
    }
    const draggedOverCard = state[listId].cards[cardId];

    // filter out the currently dragged item
    // const items = state[listId].cards[draggedItem];

    // add the dragged item after the dragged over item
    // items.splice(index, 0, this.draggedItem);

    // this.setState({items});
    setState((state)=>({
      ...state,
      [listId]: {
        ...state[listId],
        cards: {
          ...state[listId].cards,
          [draggedItem]: {
            ...state[listId][draggedItem],
            order: draggedOverCard.order-1,
          },
        },
      },
    }));
  };
  return (
    <Container>
      {
        Object.entries(state).map(([key, value])=>(
          <List
            status={value.name}
            key={key}
            cardData={value.cards}
            listId={Number(key)}
            onSubmit={handleNewCardSubmit}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
          />
        ))
      }
      <Column status=''>
        <AddList onSubmit={handleNewListSubmit}/>
      </Column>
    </Container>
  );
});

export default OrganiseProjects;
