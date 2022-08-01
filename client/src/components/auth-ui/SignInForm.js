import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../_factors/hooks/auth/useAuth.js';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from '@mui/material/DialogActions';

const SignInForm = props => {
  const { auth, setAuth, signIn, authIsLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e) => { setUsername(e.target.value); };
  const onPasswordChange = (e) => { setPassword(e.target.value); };

  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(username, password)
    .then((result) => {
      setPassword('');

      // Navigate to where user was trying to go
      props.onClose();
      navigate(from, { replace: true });
    })
    .catch(signInErr => {
      console.log(signInErr)
      setHasUsernameError(true);
      setUsernameError("Incorrect username or password.")
    });
  };

  useEffect(()=>{
    if(usernameError){
      setUsernameError("");
      setHasUsernameError(false);
    }
    if(passwordError){
      setPasswordError("");
      setHasPasswordError(false);
    }
  }, [username, password]);

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit}>
        <Box style={{display:"flex", flexDirection:"column", margin:"0 1em"}}>
          <TextField id="standard-basic-5" label="Username" variant="standard"
                     error={hasUsernameError} helperText={usernameError}
                     onChange={onUsernameChange}/>
          <TextField id="standard-basic-6" label="Password" type="password"
                     error={hasPasswordError} helperText={passwordError}
                     variant="standard" onChange={onPasswordChange} />
        </Box>

        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button disabled={authIsLoading} type="submit">Submit</Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default SignInForm;
