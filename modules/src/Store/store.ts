// This is our global react store 
/*
    - It holds the application state
    - Allows access to the state via getState()
    - Allows state to be updated via dispatch(action)
    - Registers listeners via subsribe(listener)
    - Handles unregistering of listeners via the function by subscribe(listener)
*/


// Store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../Redux/counterReducer";

export const store = configureStore({
    reducer: counterReducer
});
