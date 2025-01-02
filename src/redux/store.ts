"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducer from "./reducer/userReducer";
import { userApi } from "./apiClient/userApi";
import { categoryApi } from "./apiClient/categoryApi";
import { unitApi } from "./apiClient/unitApi";
import { productApi } from "./apiClient/productApi";
import { saleApi } from "./apiClient/salesApi";

// Create a no-op storage for non-browser environments
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve(null);
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Combine reducers
const rootReducer = combineReducers({
  userReducer,
  [productApi.reducerPath]: productApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [unitApi.reducerPath]: unitApi.reducer,
  [saleApi.reducerPath]: saleApi.reducer,
});

// Define the persist config type
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};

// Apply the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productApi.middleware,
      userApi.middleware,
      categoryApi.middleware,
      unitApi.middleware,
      saleApi.middleware
    ),
});

// Set up listeners for cache invalidation/refetching
setupListeners(store.dispatch);

// Export store types
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
