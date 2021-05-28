import { createAction, createReducer } from "@reduxjs/toolkit";

// Actions
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

// Reducer
// with ducks (re-dux) pattern, reducer should be the default export of the domain file
let lastId = 0;

// createReducer from redux toolkit uses immer (immutable update pattern) under the hood
// the benefit is that you can write 'normal' update code, without having to use spread operator

// createReducer has two params:
// the first is initial state
// the second is an object that maps actions to functions that handle those actions
export default createReducer([], {
  // key: value
  // actions: functions (event => event handler)

  // first param of the reducer is the state, which you can call bugs in this case
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      // increment lastId
      id: ++lastId,

      // payload should contain the MINIMAL information to update our system
      description: action.payload.description,
      resolved: false,
    });
  },

  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex((bug) => bug.id === action.payload.id);
    bugs[index].resolved = true;
  },
});
