import React from 'react';
import { Route } from 'react-router-dom';
import AuthTestPage from '../components/pages/auth/AuthTestPage.js';

let paths = [
  <Route key="auth-route-/auth/test" path="test" element={<AuthTestPage />} />
];

export default paths;
