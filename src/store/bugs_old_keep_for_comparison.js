import { createAction } from "@reduxjs/toolkit";

// Domain for managing a list of bugs

// the create action from redux toolkit creates the same action that would equal an action below
// but then on one line of code
const bugUpdated = createAction("bugUpdated");

// ACTION TYPES
// this file is to keep redux more maintainable
// for example, for renamings you only have to change in this file
// use past tense, as 'event' just happened
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// ACTIONS
// this file is often also called actionCreator.js
// object is represented by {} wrapped in () so you need not type return
export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description: description,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    // id: id,
    // in modern js, if name of prop and its value are equal, you can use shorthand syntax:
    id,
  },
});

// REDUCER
// with ducks (re-dux) pattern, reducer should be the default export of the domain file
let lastId = 0;

// initial state is an empty array []
export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          // increment lastId
          id: ++lastId,

          // payload should contain the MINIMAL information to update our system
          description: action.payload.description,
          resolved: false,
        },
      ];

    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== action.payload.id
          ? bug // if id not matches, just return the bug
          : {
              // else return new bug object, with modified property
              ...bug,
              resolved: true,
            }
      );

    // if no correct action is found (e.g. by mistake), return the current state
    // we do not want the system to blow up
    default:
      return state;
  }
}
