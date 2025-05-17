import { configureStore } from "@reduxjs/toolkit";
import formTypeReducer from "./FormTypeSlice";
import authSliceReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        
        formType: formTypeReducer,
    },
});

export default store;