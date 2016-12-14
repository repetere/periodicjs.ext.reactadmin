import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  sidebar_is_open:false,
};

const uiReducer = (state, action) => {
  switch (action.type) {
  case constants.ui.TOGGLE_SIDEBAR:
    var logoutFailurePayload = action.payload;
    return Object.assign(state, {
      sidebar_is_open:!state.sidebar_is_open,
    });
  case constants.ui.OPEN_SIDEBAR:
    var logoutFailurePayload = action.payload;
    return Object.assign(state, {
      sidebar_is_open:true,
    });
  case constants.ui.CLOSE_SIDEBAR:
    var failurePayload = action.payload;
    return Object.assign(state, {
      sidebar_is_open:false,
    });
  default:
    return Object.assign(initialState, state);
  }
};

export default uiReducer;