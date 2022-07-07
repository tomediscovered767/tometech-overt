import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../components/pages/public/LandingPage.js';

export default [
  <Route key="public-route-/" path="/" element={<LandingPage />} />
];
