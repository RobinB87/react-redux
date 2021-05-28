import * as actions from "./actionTypes";

// object is represented by {} wrapped in () so you need not type return
export const bugAddes = (description) => ({
  type: actions.BUG_ADDED,
  payload: {
    description: description,
  },
});
