import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './account/accountSlice';

export default configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        account: accountReducer,
    }
});

