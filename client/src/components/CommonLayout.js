/* This layout is used to wrap all files in a universal ui and provide tools. */

import React from 'react';
import { Outlet } from 'react-router-dom';

import CommonAppbar from './common-appbar/CommonAppbar.js';

const CommonLayout = props => {
  return (
    <div className="common-appbar-wrapper">
      <CommonAppbar />
      <Outlet />
    </div>
  );
};

export default CommonLayout;
