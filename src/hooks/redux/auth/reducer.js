import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import localStorageUtils, { KeyStorage } from "../../../utils/local-storage";

const localAuth = localStorageUtils.getObject(KeyStorage.AUTH) || null;

const initialState = localAuth;

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    changeAuth: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const { reducer, actions } = auth;
export const { changeAuth } = actions;
export default reducer;
