import { all } from "redux-saga/effects";

import EmailAuthSaga from '../features/EmailAuth/redux/sagas';


export function* mainSaga() {
  yield all([
    EmailAuthSaga,
  ]);
}
