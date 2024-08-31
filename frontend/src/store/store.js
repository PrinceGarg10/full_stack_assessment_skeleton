// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apislice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        selectedUser: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

