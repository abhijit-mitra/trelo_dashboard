import React, {PureComponent} from 'react';
import {Container, Column} from '../../organisms';
import List from './List';
import AddList from './AddList';
import {initialState} from './initialState';

class OrganiseProjects extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  handleNewCardSubmit=(obj)=>{
    this.setState((state)=>({
      ...state,
      [obj.listId]: {
        ...state[obj.listId],
        cards: [...state[obj.listId].cards, {name: obj.value, id: (new Date().getTime())}],
      },
    }));
  };
  handleNewListSubmit=(value)=>{
    this.setState((state)=>({
      ...state,
      [Number(new Date().getTime())]: {
        name: value,
        cards: {},
      },
    }));
  };
  handleDragStart = (cardIndex, cardObj)=>{
    this.dragedCardIndex = cardIndex;
    this.draggedCardObj = cardObj;
  };
  handleDragOver = (listId, cardIndex)=>{
    const {dragedCardIndex, state, draggedCardObj} = this;
    const draggedOverCardIndex = cardIndex;

    if (dragedCardIndex === draggedOverCardIndex) {
      return;
    }

    const items = state[listId].cards.filter((item) => item.id !== draggedCardObj.id);
    items.splice(draggedOverCardIndex, 0, draggedCardObj);

    this.setState((state)=>({
      ...state,
      [listId]: {
        ...state[listId],
        cards: items,
      },
    }));
  };
  handleCardEditComplete=(listId, cardIndex, value)=>{
    const {state} = this;
    const cards = [...state[listId].cards];
    cards[cardIndex] = {...cards[cardIndex], name: value};
    this.setState((state)=>({
      ...state,
      [listId]: {
        ...state[listId],
        cards,
      },
    }));
  }
  render() {
    const {state,
      handleNewCardSubmit,
      handleDragStart,
      handleDragOver,
      handleNewListSubmit,
      handleCardEditComplete,
    } = this;
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
              onCardEditComplete={handleCardEditComplete}
            />
          ))
        }
        <Column status=''>
          <AddList onSubmit={handleNewListSubmit}/>
        </Column>
      </Container>
    );
  }
}

export default OrganiseProjects;
