let lastId = 0;

// initial state is an empty array []
function reducer(state = [], action) {
  switch (action.type) {
    case "bugAdded":
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
    case "bugRemoved":
      return state.filter((bug) => bug.id !== action.payload.id);

    // if no correct action is found (e.g. by mistake), return the current state
    // we do not want the system to blow up
    default:
      return state;
  }
}
