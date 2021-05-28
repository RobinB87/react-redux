import { createStore } from "redux";
import reducer from "./reducer";
import { devToolsEnhancer } from "redux-devtools-extension";

// only pass the reference of the reducer, not the function: reducer()
const store = createStore(reducer, devToolsEnhancer({ trace: true }));

export default store;
