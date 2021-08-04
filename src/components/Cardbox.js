import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SocketContext } from '../store/Context/SocketContext';
import { ParseFloatNumber } from '../utils/helpers';

function Cardbox() {
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext);
  const tickerChanId = useSelector(({ ticker }) => ticker.tickerinfo.chanId);
  const ticker = useSelector(({ ticker }) => ticker.ticker);

  const [tickerData, setTickerData] = useState([]);

  // const handleTicker = () => {
  //   socketContext.ws.current.send(tickerChennel);
  // };

  useEffect(() => {
    if (tickerChanId === ticker?.CHANNEL_ID) {
      setTickerData(ticker.item);
    }
  }, [ticker, socketContext, dispatch, tickerChanId]);

  return (
    <div style={{ width: '560px' }}>
      <div
        style={{
          padding: 12,
          borderRadius: 12,
          border: '1px solid #d9d9d9',
          textTransform: 'uppercase',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <img
                alt="bitUSD"
                src="https://d10srchmli830n.cloudfront.net/1624876698792_opencart.svg"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div>
              <div
                style={{ fontSize: 18, fontWeight: 'bold', color: '#263f97' }}
              >
                BTC/USD
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: '#616161',
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
              >
                volume
                <span
                  style={{ color: '#000', paddingLeft: 8, paddingRight: 8 }}
                >
                  {ParseFloatNumber(tickerData?.VOLUME, 3) || 0}
                </span>
                btc
              </div>
              <div style={{ fontSize: 14, color: '#616161', paddingRight: 8 }}>
                {' '}
                low <span style={{ color: '#000' }}>{tickerData?.LOW}</span>
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: 'bold',
                justifyContent: 'end',
              }}
            >
              {ParseFloatNumber(tickerData?.LAST_PRICE) || 0}
            </div>
            <div
              style={{
                color: `${tickerData?.DAILY_CHANGE < 0 ? 'red ' : 'green'}`,
                fontSize: 16,
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              {ParseFloatNumber(tickerData?.DAILY_CHANGE, 2) || 0} (
              {ParseFloatNumber(tickerData?.DAILY_CHANGE_PERC, 2) || 0} % )
            </div>
            <div style={{ fontSize: 14, color: '#616161', paddingRight: 8 }}>
              {' '}
              high{' '}
              <span style={{ color: '#000' }}>{tickerData?.HIGH || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardbox;
