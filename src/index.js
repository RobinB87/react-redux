import configureStore from "./store/configureStore";
import { bugAdded, bugResolved, bugAssignedToUser, getUnresolvedBugs, getBugsByUser } from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

// there is only a getState method, not a setState
// so, the setState is actually a private property in this object
console.log(store);

// call an api
// when promise is resolved => dispatch()
store.dispatch(() => {
  store.dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
});

// in another part of the application you would not have access directly to the store
store.dispatch((dispatch, getState) => {
  // hence, you might want to add a reference to the store as a param in the middleware func
  // instead of => store => ..., use ({ dispatch, getState })
  dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
  console.log(getState());
});

// if the promise is rejected => dispatch()

// you set the state by dispatching actions
// with redux toolkit, you want to pass an object
// store.dispatch(bugAdded("Bug 1")); // so, not pass this string, but:
// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(projectAdded({ name: "Project1" }));

// const unresolvedBugs = getUnresolvedBugs(store.getState());
// console.log(unresolvedBugs);

// store.dispatch(userAdded({ name: "Blik-Jan" }));
// store.dispatch(userAdded({ name: "Henkie" }));
// store.dispatch(userAdded({ name: "De Padde" }));

// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

// pass the userId 1, this will return a func, which will get the state
// and it will return the bugs assigned to that user
// const assignedBugs = getBugsByUser(1)(store.getState());
// console.log(assignedBugs);
