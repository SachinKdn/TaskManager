import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createdApi } from "./api";
import  
// authReducer, 
{ authSlice , usersSlice}  from "./reducer";
import authReducer from "./reducer";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "auth",
    storage,
  };
  const persistConfigForUsersReducer = {
    key: "users",
    storage,
  }
  const usersReducer = usersSlice.reducer;
  const persistedAuthReducer = persistReducer(persistConfig, authReducer);

  const persistedUsersReducer = persistReducer(persistConfigForUsersReducer, usersSlice.reducer)

export const store = configureStore({
  reducer: {
    //   auth: authReducer, //our own reducer
        auth: persistedAuthReducer,
        users : persistedUsersReducer,
    //   [authSlice.name]: authSlice.reducer, //our own reducer

    //   myapi : createdApi.reducer,//we add createdApi here as a reducer
    [createdApi.reducerPath]: createdApi.reducer,//we add createdApi here as a reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(createdApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();