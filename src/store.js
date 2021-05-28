import { createStore } from "redux";
import reducer from "./reducer";

// only pass the reference of the reducer, not the function: reducer()
const store = createStore(reducer);

export default store;
