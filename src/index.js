import configureStore from "./store/configureStore";
import { bugAdded, bugResolved } from "./store/bugs";

const store = configureStore();

// there is only a getState method, not a setState
// so, the setState is actually a private property in this object
console.log(store);

// you set the state by dispatching actions
// with redux toolkit, you want to pass an object
// store.dispatch(bugAdded("Bug 1"));   // so, not pass this string, but:
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));

console.log(store.getState());
