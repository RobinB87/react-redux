import * as actions from "./store/actionTypes";

let lastId = 0;

// initial state is an empty array []
export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
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

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
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
