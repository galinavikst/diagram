import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sourceReducer from "./slices/sourceBoxSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/es/storage";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
//import storage from "./storage"; cuctom storage

const persistConfig = {
  key: "root", // or 'source' - name of slice, if custom storage
  storage,
  //whitelist: ["edgesData", "nodesData"], // if custom storage
};

const rootReducer = combineReducers({
  source: sourceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
export default store;

// store without redux-persist:
// export const store = configureStore({
//   reducer: {
//     source: sourceReducer,
//   },
// });
// export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
