import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice/index.js";
import { adminProductReducer } from "./admin/products/index.js"
const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts: adminProductReducer,
    }
})

export default store;