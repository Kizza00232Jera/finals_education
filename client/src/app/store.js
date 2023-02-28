import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

//enabling things that we can use in queries in users and event list
//setupListeners(store.dispatch)