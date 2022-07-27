import { createContext, useContext, useState } from 'react';
import AuthFormContext from '../../context/auth/AuthFormContext.js';

export const useAuthForms = () => {
  const { open, setOpen } = useContext(AuthFormContext);
  return { open, setOpen };
}

export default AuthFormContext;
