import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        error: null,
    }


const AUTHSLICE = createSlice({
    name: "auth",
    initialState,
    reducers: {},
})

export const authActions = AUTHSLICE.actions;
export const authReducer = AUTHSLICE.reducer;