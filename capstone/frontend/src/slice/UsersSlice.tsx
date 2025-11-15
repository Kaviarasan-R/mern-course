import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store/store";
import type { User } from "../types/types";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [] as User[];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

export const addUsers = createAsyncThunk(
  "users/addUsers",
  async (initialUser: User) => {
    const response = await axios.post(USERS_URL, initialUser);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
    builder.addCase(addUsers.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
