import { orderModel } from '../../utils/helpers';

export const GET_ORDER_BOOK = 'GET_ORDER_BOOK';

export const GET_ORDER_BOOK_COLLECTION = 'GET_ORDER_BOOK_COLLECTION';
export const ORDER_BOOK_INFO = 'ORDER_BOOK_INFO';

export const orderBookInfo = data => {
  return {
    type: ORDER_BOOK_INFO,
    payload: data,
  };
};

export const wsGetOrderBook = data => {
  return {
    type: GET_ORDER_BOOK,
    payload: orderModel(data),
  };
};

export const wsGetOrderBookArr = data => {
  const order = {
    CHANNEL_ID: data[0],
    item: data[1],
  };

  return {
    type: GET_ORDER_BOOK_COLLECTION,
    payload: order,
  };
};
