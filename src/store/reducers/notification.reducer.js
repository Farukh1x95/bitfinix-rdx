import { CLOSE_DIALOG, OPEN_DIALOG } from '../actions';

const INITIAL_STATE = {
  status: false,
  message: null,
};

const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return { ...state, status: true, message: action.payload };
    case CLOSE_DIALOG:
      return { ...state, status: false, message: null };
    default:
      return state;
  }
};

export default notification;
