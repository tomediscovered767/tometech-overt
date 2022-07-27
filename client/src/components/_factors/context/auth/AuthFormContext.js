import { createContext, useState } from 'react';
const AuthFormContext = createContext({});

export const AuthFormProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <AuthFormContext.Provider value={{ open, setOpen }}>
      {children}
    </AuthFormContext.Provider>
  );
};

export default AuthFormContext;
