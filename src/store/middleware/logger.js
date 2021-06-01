// middleware: code that will be executed after actions are dispatched and before it reaches the root reducer
// add all middleware in this folder, as it is central to the application, not to a specific domain like 'bugs' in this project

// next is a ref to the next middleware func
// if this is the only mw func, next will be the reducer that will handle this action
// a middleware function is a curried (currying) func with three params: store => next => ...
// but you can add another param, so, you can add a param to the function in the store
const logger = (param) => (store) => (next) => (action) => {
  console.log("Logging: ", param);

  // if you do not call next, the action will not be processed further (eventually the reducer)
  return next(action);
};

// register it in store
export default logger;
