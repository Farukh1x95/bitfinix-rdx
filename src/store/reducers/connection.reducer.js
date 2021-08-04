import { DISCONNECT_SOCKET, CONNECT_SOCKET } from '../actions';

const INITIAL_STATE = {
  connected: false,
};

const socket = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISCONNECT_SOCKET:
      return { ...state, connected: false };
    case CONNECT_SOCKET:
      return { ...state, connected: true };
    default:
      return state;
  }
};

export default socket;
