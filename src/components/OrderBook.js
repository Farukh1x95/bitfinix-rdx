import React, { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { SocketContext } from '../store/Context/SocketContext';
import { orderModelItem } from '../utils/helpers';
import { Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  table: {
    minWidth: 580,
  },
  positive: {
    backgroundColor: green[300],
  },
  negative: {
    backgroundColor: red[300],
  },
});

const OrderBook = () => {
  const classes = useStyles();
  // const socketContext = useContext(SocketContext);

  const orderBookChanId = useSelector(
    ({ orderbook }) => orderbook.orderbookinfo.chanId
  );
  const orderBook = useSelector(({ orderbook }) => orderbook.orderbook);
  const orderbookcollection = useSelector(
    ({ orderbook }) => orderbook.orderbookcollection
  );

  const [order, setOrder] = useState(null);
  const [ordercol, setOrderCol] = useState([]);

  // let orderbookItems = ordercol.map(item => orderModelItem(item));

  // console.log(ordercol);

  useEffect(() => {
    if (orderBookChanId === orderBook?.CHANNEL_ID) {
      setOrder(orderBook?.item);
    }
    if (orderBookChanId === orderbookcollection?.CHANNEL_ID) {
      setOrderCol(orderbookcollection?.item);
      mergeArrayObjects(orderbookcollection?.item, order);
    }
  }, [orderBook, orderBookChanId, orderbookcollection]);

  // updte data
  function mergeArrayObjects(orderbookItems, order) {
    if (orderbookItems.length < 0) return;
    const index =
      orderbookItems.length > 0 &&
      orderbookItems.findIndex(item => item?.PRICE === order?.PRICE);

    if (index !== -1) {
      ordercol[index] = order;
    }

    console.log(order);
    // console.log(ordercol);

    // setOrderCol([...orderbookItems, ...merge])ś

    // if (item?.PRICE === order?.PRICE) {
    //   console.log(item.PRICE, order.PRICE);
    //   //merging two objects
    //   const mergeData = { ...item, ...order };
    //   console.log(mergeData);
    // }
  }

  useCallback(() => {
    mergeArrayObjects(orderbookcollection?.item, order);
  }, [order]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">PRICE</TableCell>
            <TableCell align="right">COUNT</TableCell>
            <TableCell align="right">AMOUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordercol.length > 0 ? (
            ordercol.map(row => (
              <TableRow
                key={row.PRICE}
                className={row.AMOUNT > 0 ? classes.positive : classes.negative}
              >
                <TableCell align="right">{row?.PRICE}</TableCell>
                <TableCell align="right">{row?.COUNT}</TableCell>
                <TableCell align="right">{row?.AMOUNT}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow p="8">
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  component="p"
                >
                  No Result Found 📭
                </Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(OrderBook);
