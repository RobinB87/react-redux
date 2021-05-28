import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export default function () {
  // only pass the reference of the reducer, not the function: reducer()
  // with redux toolkit you can use their configureStore
  return configureStore({ reducer });
}
