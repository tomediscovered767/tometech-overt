import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import AllRoutes from './routes/AllRoutes.js';
import { AccessTokenProvider } from "./components/_factors/context/auth/AccessTokenContext.js";

// Used for Pre-Route actions, such as site-wide context,
// to apply site-wide css, such as html & body,
// to apply context providers
const App = () => {

  return (
    <div className="App">
      <ThemeProvider theme={createTheme()}>
          <AccessTokenProvider>
            <AllRoutes />
          </AccessTokenProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
