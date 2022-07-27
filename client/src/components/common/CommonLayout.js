/* This layout is used to wrap all files in a universal ui and provide tools. */

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import CommonAppbar from './appbar/CommonAppbar.js';
import CommonSnackbar from './snackbar/CommonSnackbar.js';
import CommonDialog from './dialog/CommonDialog.js';

import useAuth from '../_factors/hooks/auth/useAuth.js';
import { AuthFormProvider } from "../_factors/context/auth/AuthFormContext.js";
import AuthFormWrapper from '../auth-ui/AuthFormWrapper.js';

import GradientBackground from '../effects/gradient-background/GradientBackground.js';

const CommonLayout = props => {
  const { refresh } = useAuth();

  useEffect(()=>{
    refresh();
  }, []);

  return (
    <div className="common-layout-wrapper">
      <AuthFormProvider>
        <AuthFormWrapper />

        <CommonSnackbar />
        <CommonDialog />

        <GradientBackground>
          <CommonAppbar />

          <div className="page-wrapper" style={{ padding: "1em" }}>
            <Outlet />
          </div>

        </GradientBackground>

      </AuthFormProvider>
    </div>
  );
};

export default CommonLayout;
