// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./slices/appSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,  
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['app'] // excluding the data-slice from being persistant
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
