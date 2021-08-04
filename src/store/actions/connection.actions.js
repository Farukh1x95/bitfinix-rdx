import { openDialog } from './notification.actions';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const CONNECT_SOCKET = 'CONNECT_SOCKET';

export const connectSocket = () => {
  console.log('CONNECT SOCKET ✅');

  return dispatch => {
    dispatch(openDialog('CONNECT SOCKET ✅'));
    dispatch(connectedSocket());
  };
};

export const disconnect = () => {
  console.log('DISCONNECT SOCKET ❌');
  return dispatch => {
    dispatch(openDialog('DISCONNECTED SOCKET ❌'));
    dispatch(disconnectSocket());
  };
};

// ACTIONS FOR REDUX

const connectedSocket = () => {
  return {
    type: CONNECT_SOCKET,
  };
};

const disconnectSocket = () => {
  return {
    type: DISCONNECT_SOCKET,
  };
};
