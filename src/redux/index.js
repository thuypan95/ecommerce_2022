import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import uiSlice from './ui-slice';
import productSlice from './product-slice';
import cartSlice from './cart-slice';
import authSlice from './auth-slice';

const reducers = combineReducers({
    ui: uiSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
});
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'auth', 'wishlist']

};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export default store;
