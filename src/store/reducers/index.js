import { combineReducers } from 'redux';
import socket from './connection.reducer';
import ticker from './ticker.reducer';
import orderbook from './orderbook.reducer';
import notification from './notification.reducer';

const reducer = combineReducers({
  socket,
  ticker,
  orderbook,
  notification,
});

export default reducer;
