import React from 'react';

import './App.css';

import WebSocketContext from './store/Context/WebSocketContext';
import Notifications from './components/Notifications';
import TickerCard from './components/TickerCard';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import store from './store';
import { Provider } from 'react-redux';
import theme from './theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <WebSocketContext>
          <CssBaseline />
          <TickerCard />
          <Notifications />
        </WebSocketContext>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
