import { all, put, takeLatest, fork } from "redux-saga/effects";
import { getBootcampList } from "../../services/api";
import {
  getBootcampSuccess,
  getBootcampsRejected,
} from "../slice/bootcampSlice";

function* getBootcamps() {
  try {
    const result = yield getBootcampList();
    const { data } = result;
    yield put(getBootcampSuccess(data));
  } catch (error) {
    yield put(getBootcampsRejected(error?.response?.data));
  }
}

function* getBootcampsWatcher() {
  yield takeLatest("bootcampSlice/getBootcamps", getBootcamps);
}

export const bootcampSagas = [fork(getBootcampsWatcher)];
