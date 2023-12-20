import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import locationSlice from "./reducers/location";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    location: locationSlice.reducer,
  },
});

export default store;
