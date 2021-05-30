import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func2 from "./middleware/func";

export default function () {
  // only pass the reference of the reducer, not the function: reducer()
  // with redux toolkit you can use their configureStore
  // if you use multiple middleware funcs, remember they invoke in the order declared here
  return configureStore({ reducer, middleware: [logger({ destination: "console" }), func2] });
}
