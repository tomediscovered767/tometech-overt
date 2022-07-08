/* This layout is used to wrap all files in a universal ui and provide tools. */

import React from 'react';
import { Outlet } from 'react-router-dom';

import CommonAppbar from './appbar/CommonAppbar.js';
import CommonSnackbar from './snackbar/CommonSnackbar.js';
import CommonDialog from './dialog/CommonDialog.js';

const CommonLayout = props => {
  return (
    <div className="common-appbar-wrapper">
      <CommonAppbar />
      <Outlet />
      <CommonSnackbar />
      <CommonDialog />
    </div>
  );
};

export default CommonLayout;
