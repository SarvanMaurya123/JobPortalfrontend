import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice"; // ✅ import profile slice
import employerSlice from "./slices/employerSlice"; // ✅ import employer slice
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer, // ✅ add profile reducer
    authemployer: employerSlice
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "profile", "authemployer"], // ✅ persist both auth and profile
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
