import { configureStore } from "@reduxjs/toolkit";
import auth from './authSlice'
import register from './authRegisterSlice'
import news from './newSlice'
import product from './authProductSlice'
import cart from './authCartSlice'
const store = configureStore({
    reducer:{
        auth,
        register,
        news,
        product,
        cart
    }
});
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
