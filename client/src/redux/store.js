import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import conversationsReducer from './slice/conversationsSlice'
// import counterReducer from './counter'

export default configureStore({
    reducer: {
        auth: authReducer,
        conversations: conversationsReducer
    },
    devTools: true,
})