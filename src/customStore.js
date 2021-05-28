import reducer from "./reducer";

// method to create private property in javascript
function createStore(reducer) {
  let state;
  let listeners = [];

  // functions are first class citizens: you can declare funcs in funcs
  function getState() {
    return state;
  }

  function dispatch(action) {
    // call reducer to get new state
    state = reducer(state, action);

    // notify subscribers
    for (i = 0; i < listeners.length; i++) listeners[i]();
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    // store object has a method called getState
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore(reducer);
