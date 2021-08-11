import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { Box, Button, ButtonGroup, Grid, Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import { ParseFloatNumber } from '../utils/helpers';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
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

  const orderBookChanId = useSelector(
    ({ orderbook }) => orderbook.orderbookinfo.chanId
  );
  const orderBook = useSelector(({ orderbook }) => orderbook.orderbook);
  const orderbookcollection = useSelector(
    ({ orderbook }) => orderbook.orderbookcollection
  );

  const [precision, setPrecision] = useState(2);
  const [ordercol, setOrderCol] = useState([]);

  // updte data
  function mergeArrayObjects(orderbookItems, order) {
    if (orderbookItems.length < 0) return;
    const index = orderbookcollection.item.findIndex(
      item => item?.PRICE === order?.PRICE
    );

    if (index !== null && index !== -1) {
      // setOrderCol([...ordercol, ...order]);
      // console.log(index, order);
      ordercol[index] = order;
    }
  }

  useEffect(() => {
    if (orderBookChanId === orderbookcollection?.CHANNEL_ID) {
      setOrderCol(orderbookcollection?.item);

      if (orderbookcollection?.CHANNEL_ID === orderBook?.CHANNEL_ID) {
        mergeArrayObjects(ordercol, orderBook?.item);
      }
    }

    return () => {
      setOrderCol([]);
    };
  }, [orderBook, orderBookChanId, orderbookcollection, setOrderCol]);

  const HandlePrecision = type => {
    let value = 1;
    console.log(precision, value);
    if (type === 1) {
      value = precision + value;
    }
    if (type === 0) {
      if (precision < 1) return;
      value = precision - value;
    }

    setPrecision(value);
  };

  return (
    <>
      <Box component="div" m={1} className={classes.roots}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => HandlePrecision(1)}
                startIcon={<FirstPageIcon />}
              >
                0.
              </Button>
              <Button
                onClick={() => HandlePrecision(0)}
                endIcon={<LastPageIcon />}
              >
                .00
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
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
                  className={
                    row.AMOUNT > 0 ? classes.positive : classes.negative
                  }
                >
                  <TableCell align="right">{row?.PRICE}</TableCell>
                  <TableCell align="right">{row?.COUNT}</TableCell>
                  <TableCell align="right">
                    {ParseFloatNumber(row?.AMOUNT, precision)}
                  </TableCell>
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
    </>
  );
};

export default React.memo(OrderBook);
