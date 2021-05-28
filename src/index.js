import store from "./store";
import { bugAdded, bugResolved } from "./actions";
// there is only a getState method, not a setState
// so, the setState is actually a private property in this object
console.log(store);

// you set the state by dispatching actions
store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1));

console.log(store.getState());
