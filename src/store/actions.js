import * as actions from "./actionTypes";

// this file is often also called actionCreator.js
// object is represented by {} wrapped in () so you need not type return
export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: {
    description: description,
  },
});

export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    // id: id,
    // in modern js, if name of prop and its value are equal, you can use shorthand syntax:
    id,
  },
});
