import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./slices/api";
import authReducer from "./slices/auth";
import cartReducer, { type CartState } from "./slices/cart";

const cartPersistConfig = {
  key: "cart", // slice name
  storage: storage,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistReducer<CartState>(cartPersistConfig, cartReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* 

dispatch(action)
   ↓
middleware
   ↓
reducer
   ↓
store update


middleware can:
run code before action reaches reducer
stop an action
change an action
run side effects (API calls, logging, etc.)


why middleware exists
reducers must be pure:
no API calls
no async logic
no console.log
no localStorage
so middleware handles everything impure.


middleware runs between dispatch and reducer
used for async, side effects, logging
RTK already includes the important ones
don’t add custom middleware unless you need it

*/
