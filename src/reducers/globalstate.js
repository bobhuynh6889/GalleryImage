import * as types from '../actions/ActionTypes';

const INITIAL_STATE = {
  dataImage: [],
};

const globalstate = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_DATA_IMAGE:
      return {...state, dataImage: action.dataImage};
    default:
      return state;
  }
};

export default globalstate;
