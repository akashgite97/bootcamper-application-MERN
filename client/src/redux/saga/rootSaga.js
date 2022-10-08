import {all} from 'redux-saga/effects'
import {authSagas} from './authSaga';
import { bootcampSagas } from './bootcampSaga';

export default function* rootSaga(){
    yield all([...authSagas,...bootcampSagas])
}