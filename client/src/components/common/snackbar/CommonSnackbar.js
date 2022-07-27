import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const CommonSnackbar = props => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hideDuration, setHideDuration] = useState(6000);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if(reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={hideDuration}
      onClose={handleClose}
      message={message}
      action={
        <IconButton size="small" aria-label="close"
                    color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      } />
  );
};

export default CommonSnackbar;
