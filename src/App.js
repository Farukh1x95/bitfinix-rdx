import React from 'react';

import './App.css';

import WebSocketContext from './store/Context/WebSocketContext';
import Notifications from './components/Notifications';
import TickerCard from './components/TickerCard';
import { CssBaseline } from '@material-ui/core';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <WebSocketContext>
        <CssBaseline />
        <TickerCard />
        <Notifications />
      </WebSocketContext>
    </Provider>
  );
}

export default App;
