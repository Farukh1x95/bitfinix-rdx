import React from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../store/actions';

export default function Notifications() {
  const dispatch = useDispatch();
  const status = useSelector(({ notification }) => notification.status);
  const message = useSelector(({ notification }) => notification.message);

  const options = {
    vertical: 'top',
    horizontal: 'center',
  };

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Snackbar
      key={`${options.vertical}-${options.horizontal}`}
      anchorOrigin={{
        vertical: options.vertical,
        horizontal: options.horizontal,
      }}
      open={status}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          <IconButton aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
