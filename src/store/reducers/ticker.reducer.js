import { GET_TICKER, SOCKET_QUEUE, TICKER_INFO } from '../actions';

const INITIAL_STATE = {
  tickerinfo: { event: '', channel: '', chanId: '', symbol: '', pair: '' },
  ticker: {},
  queue: {},
};

const ticker = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TICKER_INFO:
      return { ...state, tickerinfo: action.payload };
    case SOCKET_QUEUE:
      const payload = action.payload;
      return {
        ...state,
        queue: { ...state.queue[payload.CHANNEL_ID], ...action.payload },
      };

    case GET_TICKER:
      return { ...state, ticker: action.payload };

    default:
      return state;
  }
};

export default ticker;
