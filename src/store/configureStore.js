import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";

export default function () {
  // only pass the reference of the reducer, not the function: reducer()
  // with redux toolkit you can use their configureStore
  // if you use multiple middleware funcs, remember they invoke in the order declared here
  // getDefaultMiddleware is from thunk package build in redux toolkit
  // it returns an array of middleware functions
  // use spread operator ... to copy all the items into the array
  // after that, add all own middleware funcs
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger({ destination: "console" }), toast, api],
  });
}
