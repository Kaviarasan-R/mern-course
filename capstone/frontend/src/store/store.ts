import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import postsReducer from "../slice/postsSlice";
import usersApiReducer from "../slice/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
