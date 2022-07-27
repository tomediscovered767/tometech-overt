import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const CommonSandbox = props => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  return (
    <div className="common-sandbox-page-wrapper" style={{
      width: "100%", height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.3)"
    }}>
      <Button variant="outlined" onClick={handleOpenDialog}>Open dialog</Button>
      <Button variant="outlined" onClick={handleOpenSnackbar}>Open snackbar</Button>
    </div>
  );
};

export default CommonSandbox;
