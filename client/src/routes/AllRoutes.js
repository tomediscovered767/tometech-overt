import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CommonLayout from '../components/CommonLayout.js';
import RequireAuth from '../components/auth-ui/RequireAuth.js';

import PublicRoutes from '../routes/PublicRoutes.js';
import AuthRoutes from '../routes/AuthRoutes.js';

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CommonLayout />}>
          { PublicRoutes }

          <Route element={<RequireAuth />}>
            { AuthRoutes }
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
