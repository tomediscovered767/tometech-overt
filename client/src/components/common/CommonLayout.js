/* This layout is used to wrap all files in a universal ui and provide tools. */

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import CommonAppbar from './appbar/CommonAppbar.js';

import useAuth from '../_factors/hooks/auth/useAuth.js';
import { AuthFormProvider } from "../_factors/context/auth/AuthFormContext.js";
import AuthFormWrapper from '../auth-ui/AuthFormWrapper.js';

import GradientBackground from '../effects/gradient-background/GradientBackground.js';

const CommonLayout = props => {
  const { refresh, isLoading } = useAuth();

  useEffect(()=>{
    refresh();
  }, []);

  // useAuth.isLoading prevents pages from re-rendering when the AuthContext updates.
  return (
    <div className="common-layout-wrapper">
        <AuthFormProvider>
          <AuthFormWrapper />

            <GradientBackground />
            <CommonAppbar />

            {!isLoading ?
              <>
                <div className="page-wrapper" style={{background:"none transparent", padding: "1em"}}>
                  <Outlet />
                </div>
              </>
            : <div>Loading...</div>}


        </AuthFormProvider>
    </div>
  );
};

export default CommonLayout;
