import React, {memo, useState} from 'react';
import {Container, Column} from '../../organisms';

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
  return (
    <Container>
      {
        Object.entries(state).map(([key, value])=>(
          <Column
            status={value.name}
            key={key}
            cardData={value.cards}
            listId={key}
            onSubmit={handleNewCardSubmit}
          />
        ))
      }
    </Container>
  );
});

export default OrganiseProjects;
