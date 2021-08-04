import { tickerModel } from "../../utils/helpers";

export const GET_TICKER = "GET_TICKER";
export const TICKER_INFO = "TICKER_INFO";
export const SOCKET_QUEUE = "SOCKET_QUEUE";

export const tickerInfo = (data) => {
  console.log("tickerInfo", data);

  return {
    type: TICKER_INFO,
    payload: data,
  };
};

// export const socketQueue = data => {
//   console.log('socketQueue', ...data);

//   const queue = {
//     CHANNEL_ID: data[0],
//     item: data[1],
//   };

//   return {
//     type: SOCKET_QUEUE,
//     payload: queue,
//   };
// };

export const wsGetTicker = (data) => {
  return {
    type: GET_TICKER,
    payload: tickerModel(data),
  };
};
