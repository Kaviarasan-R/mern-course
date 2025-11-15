import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slice/BooksSlice";
import usersReducer from "../slice/UsersSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
