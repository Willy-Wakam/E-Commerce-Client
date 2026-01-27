import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./auth-slice";
import { adminProductReducer} from "./admin/products-slice/index.js";
import adminOrderSlice from "./admin/order-sclice/index.js";
import { adminUsersReducer} from "@/store/admin/users/index.js";

import {shoppingProductsReducer} from "./shop/products-slice/index.js";
import shopCartSlice from "./shop/cart-slice/index.js";
import shopAddressSlice from "./shop/address-slice/index.js";
import shopOrderSlice from "./shop/order-slice/index.js";
import shopSearchSlice from "./shop/search/index.js";
import shopReviewSlice from "./shop/review-slice/index.js";
import commonFeatureSlice from "./common-slice/index.js";

const store = configureStore({
    reducer: {
        auth: authReducer,

        adminProducts: adminProductReducer,
        adminOrder: adminOrderSlice,
        adminUsers: adminUsersReducer,

        shopProducts: shoppingProductsReducer,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,

        commonFeature: commonFeatureSlice,
    },
});

export default store;
