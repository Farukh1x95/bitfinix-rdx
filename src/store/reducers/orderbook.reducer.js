import { orderModelItem } from '../../utils/helpers';
import {
  GET_ORDER_BOOK,
  GET_ORDER_BOOK_COLLECTION,
  ORDER_BOOK_INFO,
} from '../actions/orderbook.actions';

const INITIAL_STATE = {
  orderbookinfo: {
    event: '',
    channel: '',
    chanId: '',
    symbol: '',
    perc: '',
    freq: '',
    len: '',
    subId: '',
    pair: '',
  },
  orderbook: {
    CHANNEL_ID: '',
    item: {
      PRICE: '',

      COUNT: '',

      AMOUNT: '',
    },
  },
  orderbookcollection: [],
};
const orderbook = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDER_BOOK_INFO:
      return { ...state, orderbookinfo: action.payload };
    case GET_ORDER_BOOK:
      return { ...state, orderbook: action.payload };
    case GET_ORDER_BOOK_COLLECTION:
      const modifer = action.payload.item.map(item => orderModelItem(item));
      return {
        ...state,
        orderbookcollection: {
          CHANNEL_ID: action.payload.CHANNEL_ID,
          item: modifer,
        },
      };

    default:
      return state;
  }
};

export default orderbook;
