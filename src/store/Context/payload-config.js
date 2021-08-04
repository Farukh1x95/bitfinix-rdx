export const tickerChennel = JSON.stringify({
  event: 'subscribe',
  channel: 'ticker',
  symbol: 'tBTCUSD',
});

export const OrderBookChennel = JSON.stringify({
  event: 'subscribe',
  channel: 'book',
  symbol: 'tBTCUSD',
  prec: 'P0',
  freq: 'F1',
  len: '25',
});
