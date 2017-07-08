import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  updatedAt: new Date(),
  files: [],
  error: undefined,
};

const outputReducer = (state, action) => {
  switch (action.type) {
  case constants.output.OUTPUT_FILE_DATA_SUCCESS:
    var outputPayload = action.payload;
    return Object.assign({}, state, {
      updatedAt: new Date(),
      files: state.files.concat([ outputPayload, ]),
    });
  case constants.output.OUTPUT_FILE_DATA_ERROR:
    var errorPayload = action.payload;
    return Object.assign({}, state, {
      updatedAt: new Date(),
      error: errorPayload,
    });
  default:
    return Object.assign({}, initialState, state);
  }
};

export default outputReducer;