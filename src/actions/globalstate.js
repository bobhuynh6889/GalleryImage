import * as types from './ActionTypes';

export function saveDataImage(dataImage) {
  return {
    type: types.SAVE_DATA_IMAGE,
    dataImage,
  };
}
