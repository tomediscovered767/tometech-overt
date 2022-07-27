import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../_factors/hooks/auth/useAuth.js';

const RequireAuth = () => {
  const { accessToken } = useAuth();

  return (
    <div>
      {accessToken ? <Outlet /> : <>Auth Required Here! 🔒</>}
    </div>
  );
};

export default RequireAuth;
