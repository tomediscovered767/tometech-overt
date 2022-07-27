import React from 'react';
import SignInForm from './SignInForm.js';
import SignUpForm from './SignUpForm.js';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Dialog from '@mui/material/Dialog';
import { useAuthForms } from '../_factors/hooks/auth/useAuthForms.js';

const AuthFormWrapper = props => {
  const [ value, setValue ] = React.useState('signin');
  const { open, setOpen } = useAuthForms();
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
      <div className="auth-form-wrapper">
        <Tabs value={value} onChange={handleChange} style={{marginBottom:".5em"}}>
          <Tab value="signin" label="Sign In" />
          <Tab value="signup" label="Sign Up" />
        </Tabs>

        { value == "signin" && <SignInForm onClose={handleClose} /> }
        { value == "signup" && <SignUpForm onClose={handleClose} /> }
      </div>
    </Dialog>
  );
};

export default AuthFormWrapper;
