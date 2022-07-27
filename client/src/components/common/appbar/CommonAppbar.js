import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from "../../_factors/hooks/auth/useAuth.js";
import AuthButtonWrapper from "../../auth-ui/AuthButtonWrapper.js";

const CommonAppbar = props => {
  const { signIn } = useAuth();

  const handleMenuButtonClick = () => {
    signIn();
  };

  return (
    <div className="common-appbar-wrapper">
      <AppBar position="sticky" sx={{backgroundColor: "rgba(50, 50, 150, 0.6)"}}>
        <Toolbar variant="dense">
          {/**<IconButton
            size="large" edge="start" color="inherit"
            aria-label="menu" sx={{ mr: 2 }}
            onClick={handleMenuButtonClick} >
            <MenuIcon  />
          </IconButton>*/}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>

          <AuthButtonWrapper />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CommonAppbar;
