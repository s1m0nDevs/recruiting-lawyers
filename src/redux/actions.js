import { LOAD_DEFAULT_DATA, PUT_DATA, CHANGE_CORRECT } from './types';

export const loadDefaultData = () => ({
  type: LOAD_DEFAULT_DATA,
});

export const loadCustomData = (payload) => ({
  type: PUT_DATA,
  payload,
});

export const changeCorrect = () => ({
  type: CHANGE_CORRECT,
});
