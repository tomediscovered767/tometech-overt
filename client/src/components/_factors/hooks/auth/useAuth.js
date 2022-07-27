import { useState, useContext } from 'react';
import Cookies from 'universal-cookie';
import authApi from '../../../../services/api/AuthApi.js';
import AccessTokenContext from '../../context/auth/AccessTokenContext.js';
const cookies = new Cookies();

const getRefresh = () =>  cookies.get("tometech_rfrsh");

const useAuth = () => {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);

  const signUp = (username, email, password) => {
    return new Promise(function(resolve, reject) {
      authApi.signUp(username, email, password)
      .then(signUpResult => {
        setAccessToken(signUpResult.data?.accessToken);
        return resolve();
      })
      .catch(signUpErr => {
        return reject(signUpErr);
      });
    });
  };

  const signIn = (username, password) => {
    return new Promise(function(resolve, reject) {
      authApi.signIn(username, password)
      .then(signInResult => {
        setAccessToken(prev => signInResult?.data?.accessToken);
        return resolve();
      })
      .catch(signInErr => {
        return reject(signInErr);
      });
    });
  };

  const signOut = () => {
    return new Promise(function(resolve, reject) {
      authApi.signOut(accessToken, getRefresh())
      .then(signOutResult => {
        setAccessToken(prev => null);
        return resolve();
      })
      .catch(signOutErr => {
        console.log(signOutErr);
        return reject(signOutErr);
      });
    });
  };

  const refresh = () => {
    return new Promise(function(resolve, reject) {
      authApi.refresh()
      .then(refreshResult => {
        setAccessToken(prev => refreshResult?.data?.accessToken);
        return resolve();
      })
      .catch(refreshErr => {
        console.log(refreshErr)
        return reject(refreshErr);
      });
    });
  };

  return { accessToken, signIn, signUp, signOut, refresh };
};

export default useAuth;
