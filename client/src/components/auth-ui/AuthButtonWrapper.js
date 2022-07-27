import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import useAuth from '../_factors/hooks/auth/useAuth.js';
import { useAuthForms } from '../_factors/hooks/auth/useAuthForms.js';

const SignInButton = props => {
  const { open, setOpen } = useAuthForms();

  const handleOpen  = () => { setOpen(true); };

  return (
    <div className="sign-in-button-wrapper">
      <Button disabled={false} className="sign-in-button"
              variant="contained" onClick={handleOpen}>
        {props.text ? props.text : "Sign In"}
      </Button>
    </div>
  );
};

const AvatarButton = () => {
  const { auth, setAuth, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const handleSignOut = () => { signOut(); };

  return (
    <div className="auth-avatar-button-wrapper">
      <IconButton size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar" aria-haspopup="true"
        onClick={handleMenu} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {/**<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
        <MenuItem component={Link} to="/auth/test">Auth Test</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}

const AuthButtonWrapper = () => {
  const { accessToken } = useAuth();

  return (
    Boolean(accessToken) ? <AvatarButton /> : <SignInButton />
  );
}

export default AuthButtonWrapper;
