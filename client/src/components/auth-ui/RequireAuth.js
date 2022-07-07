import React from 'react';
import { Outlet } from 'react-router-dom';

const RequireAuth = () => {
  return (
    <div>
      Auth Required Here
      <Outlet />
    </div>
  );
};

export default RequireAuth;
