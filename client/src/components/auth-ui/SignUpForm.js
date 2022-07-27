import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../_factors/hooks/auth/useAuth.js';
import { Button, Paper, Grid, TextField, Switch } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { validate } from 'validate.js';

function SignupForm(props){
  const { auth, setAuth, signUp, authIsLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [cpassword, setCPassword] = useState("");

  const [hasGeneralError, setHasGeneralError]     = useState(false);
  const [hasUsernameError, setHasUsernameError]   = useState(false);
  const [hasEmailError, setHasEmailError]         = useState(false);
  const [hasPasswordError, setHasPasswordError]   = useState(false);
  const [hasCpasswordError, setHasCpasswordError] = useState(false);

  const [generalError, setGeneralError]     = useState("");
  const [usernameError, setUsernameError]   = useState("");
  const [emailError, setEmailError]         = useState("");
  const [passwordError, setPasswordError]   = useState("");
  const [cpasswordError, setCPasswordError] = useState("");

  const onUsernameChange  = (e) => { setUsername(e.target.value);  };
  const onEmailChange     = (e) => { setEmail(e.target.value);     };
  const onPasswordChange  = (e) => { setPassword(e.target.value);  };
  const onCPasswordChange = (e) => { setCPassword(e.target.value); };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if(reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const constraints = {
    username:{
      presence: true,
      length: { minimum: 6,   message: "must be at least 6 characters." }
    },
    email:{ presence: true, email: true },
    password:{
      presence: true,
      length: { minimum: 8, message: "must be at least 8 characters." }
    },
    cpassword:{ presence: true, equality: "password" }
  };

  const validateFields = () => {
    let errors = validate({username, email, password, cpassword}, constraints);

    if(!errors){
      setHasUsernameError(false);
      setHasEmailError(false);
      setHasPasswordError(false);
      setHasCpasswordError(false);
      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      setCPasswordError("");

      return true;
    };

    if(Array.isArray(errors.username)){
      setHasUsernameError(true);
      setUsernameError(errors.username[0]);
      return false;
    }
    else{
      setHasUsernameError(false);
      setUsernameError("");
    }

    if(Array.isArray(errors.email)){
      setHasEmailError(true);
      setEmailError(errors.email[0]);
      return false;
    }
    else{
      setHasEmailError(false);
      setEmailError("");
    }

    if(Array.isArray(errors.password)){
      setHasPasswordError(true);
      setPasswordError(errors.password[0]);
      return false;
    }
    else{
      setHasPasswordError(false);
      setPasswordError("");
    }

    if(Array.isArray(errors.cpassword)){
      setHasCpasswordError(true);
      setCPasswordError(errors.cpassword[0]);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(validateFields()){
      signUp(username, email, password)
      .then(() => {
        // Navigate to where user was trying to go
        setPassword('');
        setCPassword('');
        navigate(from, { replace: true });
      })
      .catch(signUpErr => {
        /**
         * Errors:
         * 0: Query successful. Did not insert refresh token into table.
         * 1: Query unsuccessful. Could not insert refresh token into table.
         * 2: Username is taken.
         * 3: Query successful. Did not insert new user into table.
         * 4: Query unsuccessful. Could not insert user into table.
         * 5: Query unsuccessful. Could not check if username is taken.
         * 6: Error hashing password.
         */
      });
    }
  };

  return (
    <div className="signup-form-wrapper">
      <form onSubmit={handleSubmit}>
        <Box style={{display:"flex", flexDirection:"column", margin:"0 1em"}}>
          <TextField id="standard-basic-1" label="Username" variant="standard"
                     error={hasUsernameError} helperText={usernameError}
                     onChange={onUsernameChange} />

          <TextField id="standard-basic-2" label="Email" variant="standard"
                     error={hasEmailError} helperText={emailError}
                     onChange={onEmailChange} />

          <TextField id="standard-basic-3" label="Password"
                     type="password" variant="standard"
                     error={hasPasswordError} helperText={passwordError}
                     onChange={onPasswordChange} />

          <TextField id="standard-basic-4" label="Confirm Password"
                     type="password" variant="standard"
                     error={hasCpasswordError} helperText={cpasswordError}
                     onChange={onCPasswordChange} />
        </Box>

        <Snackbar open={openSnackbar} autoHideDuration={6000}
                  onClose={handleCloseSnackbar} message={generalError} />

        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button disabled={authIsLoading} type="submit">Submit</Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default SignupForm;
