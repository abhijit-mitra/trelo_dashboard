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
    const {state} = this;
    const order = Object.entries(state[obj.listId].cards).length;
    this.setState((state)=>({
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
  handleNewListSubmit=(value)=>{
    this.setState((state)=>({
      ...state,
      [Number(new Date().getTime())]: {
        name: value,
        cards: {},
      },
    }));
  };
  handleDragStart = (cardId)=>{
    this.draggedItem = cardId;
  };
  handleDragOver = (listId, cardId)=>{
    const {draggedItem, state} = this;
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
    this.setState((state)=>({
      ...state,
      [listId]: {
        ...state[listId],
        cards: {
          ...state[listId].cards,
          [draggedItem]: {
            ...state[listId].cards[draggedItem],
            order: draggedOverCard.order,
          },
        },
      },
    }));
  };
  render() {
    const {state,
      handleNewCardSubmit,
      handleDragStart,
      handleDragOver,
      handleNewListSubmit,
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
