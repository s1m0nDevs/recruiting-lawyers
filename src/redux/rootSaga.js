import { takeEvery, call, put, select } from 'redux-saga/effects';
import * as d3 from 'd3-fetch';
import { LOAD_DEFAULT_DATA } from './types';
import { loadCustomData, changeCorrect } from './actions';

// d3-fetch alows parse csv
function getDataFromCsv() {
  return d3.csv('includes/data.csv');
}

function* workData() {
  const data = yield call(getDataFromCsv);
  const isCorrectData = yield select((state) => state.correctData);
  let isCorrectCurData = true;
  // Same logic as in ControlButtons component
  data.forEach((obj, index) => {
    Object.values(data['columns']).forEach((key) => {
      if ((key === 'Full Name' || key === 'Phone' || key === 'Email') && !obj[key]) {
        isCorrectCurData = false;
      }
    });
    obj['id'] = (index + 1).toString();
  });
  data['columns'].unshift('id');
  if (isCorrectData !== isCorrectCurData) yield put(changeCorrect());
  yield put(loadCustomData(data));
}

export function* watchData() {
  yield takeEvery(LOAD_DEFAULT_DATA, workData);
}
