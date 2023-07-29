import { configureStore} from "@reduxjs/toolkit";
import { loginreducer } from "./loginSlice";

export const store = configureStore({
    reducer:{
        loginState: loginreducer
    }
})