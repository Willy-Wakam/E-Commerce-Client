import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
};
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/users", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = {
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
};

export const { setUsers } = usersSlice.reducers;
export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/fetchUsers":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
