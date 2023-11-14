import { configureStore } from "@reduxjs/toolkit";

import auth from "../hooks/redux/auth/reducer";

const rootReducer = {
  auth,
};

export const store = configureStore({
  reducer: rootReducer,
});
