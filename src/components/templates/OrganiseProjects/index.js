import React, {memo, useState} from 'react';
import {Container, Column} from '../../organisms';
import List from './List';
import AddList from './AddList';

const initialState={
  1: {
    name: 'Design',
    cards: {},
  },
  2: {
    name: 'To Do',
    cards: {},
  },
  3: {
    name: 'Development',
    cards: {},
  },
  4: {
    name: 'QA',
    cards: {},
  },
  5: {
    name: 'Ready For Release',
    cards: {},
  },
  6: {
    name: 'Done',
    cards: {},
  },
};

const OrganiseProjects = memo((props) => {
  const [state, setState] = useState(initialState);
  const handleNewCardSubmit=(obj)=>{
    setState((state)=>({
      ...state,
      [obj.listId]: {
        ...state[obj.listId],
        cards: {
          ...state[obj.listId].cards,
          [Number(new Date().getTime())]: obj.value,
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
  return (
    <Container>
      {
        Object.entries(state).map(([key, value])=>(
          <List
            status={value.name}
            key={key}
            cardData={value.cards}
            listId={key}
            onSubmit={handleNewCardSubmit}
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
