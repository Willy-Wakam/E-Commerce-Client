import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice/index.js";
import { usersReducer } from "./users/index.js";

const store = configureStore({
    reducer : {
        auth: authReducer,
        users: usersReducer
    }
})

export default store;