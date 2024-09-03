import { configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./reducer";
import logger from "redux-logger";

const store = configureStore({
  reducer: weatherSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
