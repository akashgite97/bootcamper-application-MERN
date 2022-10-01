import { call, put, fork, takeLatest, takeEvery } from "redux-saga/effects";
import { login, register, passwordReset } from "../../services/api";
import {
  loginSuccess,
  loginRejected,
  registerSuccess,
  registerRejected,
  resetPasswordRejected,
  resetPasswordSuccess,
} from "../slice/authSlice";

function* loginUser(userDetails) {
  try {
    let result = yield login(userDetails.payload);
    const { data } = result;
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginRejected(error));
  }
}

function* registerUser(userDetails) {
  try {
    let result = yield register(userDetails.payload);
    const { data } = result;
    yield put(registerSuccess(data));
  } catch (error) {
    yield put(registerRejected(error));
  }
}

function* resetPassword(userDetails) {
  console.log("email", userDetails.payload)
  try {
    let result = yield passwordReset(userDetails.payload);
    const { data } = result;
    yield put(resetPasswordSuccess(data));
  } catch (error) {
    yield put(resetPasswordRejected(error));
  }
}

function* watchResetPassword() {
  yield takeLatest("authSlice/resetPassword", resetPassword);
}

function* watchRegisterUser() {
  yield takeLatest("authSlice/registerUser", registerUser);
}

function* watchLoginUser() {
  yield takeLatest("authSlice/loginUser", loginUser);
}

export const authSagas = [
  fork(watchLoginUser),
  fork(watchRegisterUser),
  fork(watchResetPassword),
];
