const logger = (param) => (store) => (next) => (action) => {
  console.log("Logging: ", param);

  // if you do not call next, the action will not be processed further (eventually the reducer)
  return next(action);
};

// register it in store
export default logger;
