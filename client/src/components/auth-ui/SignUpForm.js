import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../_factors/hooks/auth/useAuth.js';
import { Button, TextField } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { validate } from 'validate.js';

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

function SignupForm(props){
  const { signUp, authIsLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname || "/";

  const [username, setUsername]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [cpassword, setCPassword] = useState("");

  const [hasUsernameError, setHasUsernameError]   = useState(false);
  const [hasEmailError, setHasEmailError]         = useState(false);
  const [hasPasswordError, setHasPasswordError]   = useState(false);
  const [hasCPasswordError, setHasCPasswordError] = useState(false);

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
    setGeneralError("");
    setOpenSnackbar(false);
  };

  const validateFields = () => {
    let errors = validate({username, email, password, cpassword}, constraints);

    if(!errors) return true;

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
      setHasCPasswordError(true);
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

        props.onClose();
        navigate(from, { replace: true });
      })
      .catch(signUpErr => {
        console.log(signUpErr)
        setGeneralError("An internal error has occured. Please refresh the page and try again.");
        setOpenSnackbar(true);
      });
    }
  };

  const removeErrors = () => {
    if(usernameError){
      setUsernameError("");
      setHasUsernameError(false);
    }
    if(emailError){
      setEmailError("");
      setHasEmailError(false);
    }
    if(passwordError){
      setPasswordError("");
      setHasPasswordError(false);
    }
    if(cpasswordError){
      setCPasswordError("");
      setHasCPasswordError(false);
    }
  };

  return (
    <div className="signup-form-wrapper" onChange={removeErrors}>
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
                     error={hasCPasswordError} helperText={cpasswordError}
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
