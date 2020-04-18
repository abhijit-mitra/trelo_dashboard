import React, {PureComponent} from 'react';
import {Container, Column} from '../../organisms';
import List from './List';
import AddList from './AddList';
import {initialState} from './initialState';

class OrganiseProjects extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.prevDragOverListId = null;
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
  handleDragStart = (listId, cardIndex, cardObj)=>{
    this.draggedCardListId = listId;
    this.dragedCardIndex = cardIndex;
    this.draggedCardObj = cardObj;
  };
  handleDragOverOnSameList = (listId, draggedOverCardIndex)=>{
    const {dragedCardIndex, state, draggedCardObj, prevDragOverListId} = this;
    let prevDragOverList;

    if (dragedCardIndex === draggedOverCardIndex) {
      return;
    }

    if (prevDragOverListId && prevDragOverListId!==listId) {
      prevDragOverList = state[prevDragOverListId].cards.filter((item) => item.id !== draggedCardObj.id);
    }

    const items = state[listId].cards.filter((item) => item.id !== draggedCardObj.id);
    items.splice(draggedOverCardIndex, 0, draggedCardObj);

    this.setState((state)=>{
      const obj = {
        ...state,
        [listId]: {
          ...state[listId],
          cards: items,
        },
      };
      if (prevDragOverList) {
        obj[prevDragOverListId].cards = prevDragOverList;
      }
      return obj;
    });
    this.prevDragOverListId = listId;
  }
  handleDragOverOnEmptyList = (listId)=>{
    const {draggedCardListId, state, draggedCardObj, prevDragOverListId} = this;
    let prevDragOverList;
    if (prevDragOverListId && prevDragOverListId!==listId) {
      prevDragOverList = state[prevDragOverListId].cards.filter((item) => item.id !== draggedCardObj.id);
    }
    const items = state[draggedCardListId].cards.filter((item) => item.id !== draggedCardObj.id);
    this.setState((state)=>{
      const obj = {
        ...state,
        [draggedCardListId]: {
          ...state[draggedCardListId],
          cards: items,
        },
        [listId]: {
          ...state[listId],
          cards: [this.draggedCardObj],
        },
      };
      if (prevDragOverList) {
        obj[prevDragOverListId].cards = prevDragOverList;
      }
      return obj;
    });
    this.prevDragOverListId = listId;
  }
  handleDragOverOnDiffentList = (listId, draggedOverCardIndex)=>{
    const {draggedCardListId, state, draggedCardObj, prevDragOverListId} = this;
    let prevDragOverList;
    if (draggedOverCardIndex===undefined) {
      this.handleDragOverOnEmptyList(listId);
    } else {
      const draggedList = state[draggedCardListId].cards.filter((item) => item.id !== draggedCardObj.id);
      if (prevDragOverListId && prevDragOverListId!==listId) {
        prevDragOverList = state[prevDragOverListId].cards.filter((item) => item.id !== draggedCardObj.id);
      }
      const dragOverList = state[listId].cards.filter((item) => item.id !== draggedCardObj.id);
      dragOverList.splice(draggedOverCardIndex, 0, draggedCardObj);

      this.setState((state)=>{
        const obj = {
          ...state,
          [draggedCardListId]: {
            ...state[draggedCardListId],
            cards: draggedList,
          },
          [listId]: {
            ...state[listId],
            cards: dragOverList,
          },
        };
        if (prevDragOverList) {
          obj[prevDragOverListId].cards = prevDragOverList;
        }
        return obj;
      });
      this.prevDragOverListId = listId;
    }
  }
  handleDragOver = (listId, cardIndex)=>{
    if (listId === this.draggedCardListId) {
      this.handleDragOverOnSameList(listId, cardIndex);
    } else {
      this.handleDragOverOnDiffentList(listId, cardIndex);
    }
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
