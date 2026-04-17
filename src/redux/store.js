import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartFoodSlice";
import searchFoodReducer from "./features/search/searchFoodSlice";
import userLoginReducer from "./features/login/loginUserSlice";
import bookOrderReducer from "./features/order/bookOrderSlice";
import hotelDetailReducer from "./features/hotel/hotelDetailSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    searchFood: searchFoodReducer,
    login: userLoginReducer,
    orders: bookOrderReducer,
    hotel:hotelDetailReducer,
  },
});
