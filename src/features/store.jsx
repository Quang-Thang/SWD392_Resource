import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/CartSlice";
import { createLogger } from "redux-logger";

const logger = createLogger({
  collapsed: true,
});

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
