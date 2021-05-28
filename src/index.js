import store from "./store/store";
import { bugAdded, bugResolved } from "./store/actions";
// there is only a getState method, not a setState
// so, the setState is actually a private property in this object
console.log(store);

// you set the state by dispatching actions
store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugAdded("Bug 2"));
store.dispatch(bugAdded("Bug 3"));
store.dispatch(bugResolved(1));

console.log(store.getState());
