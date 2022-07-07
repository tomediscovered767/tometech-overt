import React from 'react';
import './App.css';
import AllRoutes from './routes/AllRoutes.js';

// Used for Pre-Route actions, such as site-wide context,
// and to apply site-wide css, such as html & body
const App = () => {
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
};

export default App;
