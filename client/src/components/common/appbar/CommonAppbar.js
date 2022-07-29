import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useAuth from "../../_factors/hooks/auth/useAuth.js";
import AuthButtonWrapper from "../../auth-ui/AuthButtonWrapper.js";

const CommonAppbar = props => {
  const { signIn } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };

  return (
    <div className="common-appbar-wrapper">
      <AppBar position="fixed" sx={{backgroundColor: "rgba(50, 50, 150, 0.6)"}}>
        <Toolbar variant="dense">
          <IconButton
            size="large" edge="start" color="inherit"
            aria-label="menu" sx={{ mr: 2 }}
            onClick={handleMenu} >
            <MenuIcon  />
          </IconButton>

          <Menu id="common-appbar-menu" anchorEl={anchorEl} keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem component={Link} to="/"
                      onClick={handleClose}>Home</MenuItem>
            <MenuItem component={Link} to="/data/game-list"
                      onClick={handleClose}>Game List</MenuItem>
          </Menu>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>

          <AuthButtonWrapper />
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </div>
  );
};

export default CommonAppbar;
