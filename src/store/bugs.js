import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

// use createSlice to combine creating actions and reducers
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // actions => action handlers
    bugAdded: (bugs, action) => {
      bugs.push({
        // increment lastId
        id: ++lastId,

        // payload should contain the MINIMAL information to update our system
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
  },
});

export const { bugAdded, bugResolved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

// selectors
// selector is a function that takes the state and returns the computed state
// memoization
// technique to optimize expensive funcs
// if you call same func with same params, you can get output right from the cache
// give state (bugs) and get the not resolved bugs
// if the list is not changed, the logic will not be executed again
export const getUnresolvedBugs = createSelector(
  // outputs of these (bugs)
  (state) => state.entities.bugs,

  // will be the inputs (bugs) of these
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

// the create selector returns a function
// so, to be able to get the userId, set the constant to a different function
// this func will take a param, userId
// and will return the value, that is returned by the createSelector func
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
