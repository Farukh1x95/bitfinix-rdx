// parse the Floating Number
export function ParseFloatNumber(str, val) {
  if (!str && val <= 0) return;

  return Number.parseFloat(str).toFixed(val);
}
// ORDER BOOK MODEL
export const orderModel = data => {
  const tic = data[1];

  const order = {
    CHANNEL_ID: data[0],

    item: {
      PRICE: tic[0],

      COUNT: tic[1],

      AMOUNT: tic[2],
    },
  };
  return order;
};

// ORDER BOOK ITEM MODEL
export const orderModelItem = data => {
  const order = {
    PRICE: data[0],

    COUNT: data[1],

    AMOUNT: data[2],
  };

  return order;
};

// TICKER MODEL
export const tickerModel = data => {
  const tic = data[1];

  const tick = {
    CHANNEL_ID: data[0],
    item: {
      BID: tic[0],
      BID_SIZE: tic[1],
      ASK: tic[2],
      ASK_SIZE: tic[3],
      DAILY_CHANGE: tic[4],
      DAILY_CHANGE_PERC: tic[5],
      LAST_PRICE: tic[6],
      VOLUME: tic[7],
      HIGH: tic[8],
      LOW: tic[9],
    },
  };
  return tick;
};
