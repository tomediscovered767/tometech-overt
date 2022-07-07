import React from 'react';
import { Route } from 'react-router-dom';
import AuthTestPage from '../components/pages/auth/AuthTestPage.js';

export default [
  <Route key="auth-route-/auth/test" path="/auth/test" element={<AuthTestPage />} />
];
