import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import LandingPage from '../components/pages/public/LandingPage.js';

let paths = [
  <Route key="public-route-/"
         path="/" element={<LandingPage />} />,
  <Route key="public-route-redirect-unknowns"
         path="*" element={<Navigate to="/" />} />
];

export default paths;
