import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./bugs";

// only pass the reference of the reducer, not the function: reducer()

export default function configureStore() {
  return createStore(reducer, devToolsEnhancer({ trace: true }));
}
