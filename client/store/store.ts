import {configureStore} from '@reduxjs/toolkit'
import reactReducer from "./slices/reactSlice"
import authReducer from "./slices/authSlice"

export default configureStore({
    reducer: {
        reactRed: reactReducer,
        auth: authReducer,
    }
})