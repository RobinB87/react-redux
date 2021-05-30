import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";

export default function () {
  // only pass the reference of the reducer, not the function: reducer()
  // with redux toolkit you can use their configureStore
  return configureStore({ reducer, middleware: [logger({ destination: "console" })] });
}
