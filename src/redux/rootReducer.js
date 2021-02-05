import produce from 'immer';
import { PUT_DATA, CHANGE_CORRECT } from './types';

const initialState = {
  data: [],
  correctData: true,
};

export const rootReducer = produce((draft, action) => {
  if (action.type === PUT_DATA) {
    draft.data = action.payload;
  }
  if (action.type === CHANGE_CORRECT) {
    draft.correctData = !draft.correctData;
  }
}, initialState);
