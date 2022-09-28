import {configureStore} from '@reduxjs/toolkit'
import formReducer from './slice/formSlice'
import authReduer from './slice/authSlice'
export const store = configureStore({
    reducer:{
        formData:formReducer,
        auth:authReduer
    }
})