import { combineReducers } from "redux";
import entitiesReducer from "./entities";

// here you can have for example entities reducers, auth reducer, etc
export default combineReducers({
  entities: entitiesReducer,
});
