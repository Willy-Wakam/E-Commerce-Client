import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    isLoading: true,
    error: null,
};

const baseURL = import.meta.env.DEV? import.meta.env.VITE_API_BASE_URL_DEV : import.meta.env.VITE_API_BASE_URL;


export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async () => {
        try {
            const response = await axios.get(
                `${baseURL}/api/admin/users/get`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            return response.data;
        } catch (error) {
            console.log(error);
        }
    })

const adminUsers = createSlice({
    name: "adminUsers",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});


export const adminUsersReducer = adminUsers.reducer;