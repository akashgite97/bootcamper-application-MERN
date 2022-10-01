import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice/formSlice";
import authReduer from "./slice/authSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    formData: formReducer,
    auth: authReduer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
