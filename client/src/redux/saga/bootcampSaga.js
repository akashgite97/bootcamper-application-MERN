import { put, takeLatest, fork } from "redux-saga/effects";
import { getBootcampList,searchBootcampByLocation } from "../../services/api";
import {
  getBootcampSuccess,
  getBootcampsRejected,
  searchBootcampByLocationSuccess,
  searchBootcampByLocationRejected,
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

function* searchBootcampBylocation(searchDetails) {
  try {
    const {zipCode, milesFrom} = searchDetails.payload
console.log("zipCode",zipCode)
    const result = yield searchBootcampByLocation(zipCode, milesFrom);
    const { data } = result;
    yield put(searchBootcampByLocationSuccess(data));
  } catch (error) {
    yield put(searchBootcampByLocationRejected(error?.response?.data));
  }
}

function* searchBootcampByLocationsWatcher() {
  yield takeLatest(
    "bootcampSlice/searchBootcampByLocation",
    searchBootcampBylocation
  );
}

export const bootcampSagas = [
  fork(getBootcampsWatcher),
  fork(searchBootcampByLocationsWatcher),
];
