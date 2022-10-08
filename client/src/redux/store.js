import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice/formSlice";
import authReduer from "./slice/authSlice";
import bootcampsReducer from "./slice/bootcampSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    formData: formReducer,
    auth: authReduer,
    bootcamps:bootcampsReducer
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
