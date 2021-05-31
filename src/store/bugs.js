import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

// use createSlice to combine creating actions and reducers
const slice = createSlice({
  name: "bugs",
  initialState: { list: [], loading: false, lastFetch: null },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    // actions => action handlers
    // addBug - bugAdded
    // = command - event
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugUpdated: (bug, action) => {
      bug = action.payload;
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

export const { bugsRequested, bugsReceived, bugsRequestFailed, bugAdded, bugUpdated, bugResolved, bugAssignedToUser } =
  slice.actions;
export default slice.reducer;

// action creators
const url = "/bugs";

// loadBugs is a func, that retunrs a func which has two params, dispatch and getstate
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  // in order to start the workflow, we need to explicitly dispatch the action
  dispatch(
    apiCallBegan({
      url: url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

// export const loadBugs = () =>
//   apiCallBegan({
//     url: url,
//     onStart: bugsRequested.type,
//     // here we use strings, not passing functions
//     // action objects should be serializable, to be stored
//     // functions are not serializable
//     onSuccess: bugsReceived.type,
//     onError: bugsRequestFailed.type,
//     // middleware should be intelligent enough to catch normal errors,
//     // so you do not need to specify onError everywhere
//     // reserve it for specific scenarios where you want to do something specific with the bugs
//   });

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

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
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);

// the create selector returns a function
// so, to be able to get the userId, set the constant to a different function
// this func will take a param, userId
// and will return the value, that is returned by the createSelector func
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((bug) => bug.userId === userId)
  );
