import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const CommonDialog = props => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [maxWidth, setMaxWidth] = useState("md");
  const [fullWidth, setFullWidth] = useState(false);

  const handleClose = () => { setOpen(false); };

  const [actions, setActions] =
        useState(<Button onClick={handleClose}>Close</Button>);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
    <Button onClick={handleClick}>Open simple dialog</Button>
    <Dialog maxWidth={maxWidth} fullWidth={fullWidth} onClose={handleClose} open={open}>
      {title ? <DialogTitle>{title}</DialogTitle> : title}
      {content ? <DialogContent>{content}</DialogContent> : content}
      {actions ? <DialogActions>{actions}</DialogActions> : null }
    </Dialog>
    </>
  );
};

export default CommonDialog;
