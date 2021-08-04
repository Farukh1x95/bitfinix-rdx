import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../store/Context/SocketContext';
import { tickerChennel } from '../store/Context/payload-config';
import Cardbox from './Cardbox';
import OrderBook from './OrderBook';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardTickerCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = {
  title: 'Pro',
  subheader: 'Most popular',
  price: '15',
  description: [
    '20 users included',
    '10 GB of storage',
    'Help center access',
    'Priority email support',
  ],
  buttonText: 'Send Ticker',
  buttonVariant: 'contained',
};

export default function TickerCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext);
  const connected = useSelector(({ socket }) => socket.connected);
  const tickerinfo = useSelector(({ ticker }) => ticker.tickerinfo);
  const ticker = useSelector(({ ticker }) => ticker.ticker);

  const [tickerData, setTickerData] = useState([]);

  const handleTicker = () => {
    socketContext.ws.send(tickerChennel);
  };

  useEffect(() => {
    if (tickerinfo?.chanId === ticker.CHANNEL_ID) {
      setTickerData(ticker.item);
    }
  }, [tickerinfo, ticker]);

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            BetFinix
          </Typography>

          <Button
            variant={tiers.buttonVariant}
            className={classes.link}
            color="primary"
            onClick={handleTicker}
          >
            {tiers.buttonText}
          </Button>

          {connected ? (
            <Button
              color="primary"
              variant="outlined"
              className={classes.link}
              onClick={() => socketContext.ws.close()}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              className={classes.link}
              onClick={() => socketContext.connect()}
            >
              Connect
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          TickerCard
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Quickly build an effective TickerCard table for your potential
          customers with this layout. It&apos;s built with default Material-UI
          components with little customization.
        </Typography>
        {/* TiCKER CARD */}
        <Cardbox />
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <OrderBook />
          {/* Enterprise card is full width at sm breakpoint */}
          {/* <Grid
            item
            key={tiers.title}
            xs={12}
            sm={tiers.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tiers.title}
                subheader={tiers.subheader}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                action={tiers.title === 'Pro' ? <StarIcon /> : null}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardTickerCard}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    $ {ParseFloatNUmber(tickerData?.ASK_SIZE, 3) || 0}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    /mo
                  </Typography>
                </div>
                <ul>
                  {tiers.description.map(line => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
