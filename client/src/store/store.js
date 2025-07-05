import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice/index.js";
import { adminProductReducer } from "./admin/products-slice/index.js"
import { shoppingProductsReducer } from "./shop/products-slice/index.js"
const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts: adminProductReducer,
        shopProducts: shoppingProductsReducer,
    }
})

export default store;