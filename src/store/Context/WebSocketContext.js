import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  connectSocket,
  disconnect,
  openDialog,
  tickerInfo,
  wsGetTicker,
} from '../actions';
import {
  orderBookInfo,
  wsGetOrderBook,
  wsGetOrderBookArr,
} from '../actions/orderbook.actions';
import { OrderBookChennel, tickerChennel } from './payload-config';
import { SocketContext } from './SocketContext';

function WebSocketContext(props) {
  const dispatch = useDispatch();

  const WS_URL = 'wss://api-pub.bitfinex.com/ws/2';

  // const orderbookinfo = useSelector(
  //   ({ orderbook }) => orderbook.orderbookinfo.chanId
  // );
  // const tickerchanId = useSelector(({ ticker }) => ticker.tickerinfo.chanId);

  const ws = useRef();

  const connect = () => {
    //Connect the WebSocket
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = e => {
      console.log('WS OPEN', e);

      // start request when socket connected.
      ws.current.send(tickerChennel);
      ws.current.send(OrderBookChennel);
      // Connect Scoket message
      dispatch(connectSocket());
    };

    ws.current.onerror = e => {
      console.error('ws ERROR', e);
      dispatch(disconnect());
    };

    ws.current.onclose = e => {
      console.log('ws CLOSED', e);
      dispatch(disconnect());
    };

    ws.current.onmessage = msg => {
      // console.log('WS MESSAGE', msg);
      let res = JSON.parse(msg.data);

      switch (res.event) {
        case 'info':
          console.log('info', res);
          break;

        case 'subscribed':
          console.log('subscribed', res);
          if (res.channel === 'ticker') {
            dispatch(tickerInfo(res));
          }
          if (res.channel === 'book') {
            dispatch(orderBookInfo(res));
          }
          break;

        case 'error':
          console.log('error', res);
          dispatch(openDialog(`${res.msg} ⭕️`));
          break;

        default:
          // console.log('default', ...res);
          if (res[1] !== 'hb') {
            if (res[1].length === 3) dispatch(wsGetOrderBook(res));
            if (res[1].length === 50) dispatch(wsGetOrderBookArr(res));
            if (res[1].length === 10) dispatch(wsGetTicker(res));
          }
          break;
      }
    };
  };

  useEffect(() => {
    connect();
    return () => ws.current.close();
  }, []);

  return (
    <SocketContext.Provider value={{ ws: ws, connect }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default WebSocketContext;
