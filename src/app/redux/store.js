import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import locationSlice from "./reducers/location";
import categorySlice from "./reducers/category";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    location: locationSlice.reducer,
    category: categorySlice.reducer,
  },
});

export default store;
