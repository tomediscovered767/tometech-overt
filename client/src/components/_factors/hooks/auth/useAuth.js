import { useState, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import authApi from '../../../../services/api/AuthApi.js';
import AccessTokenContext from '../../context/auth/AccessTokenContext.js';
const cookies = new Cookies();

const getRefresh = () =>  cookies.get("tometech_rfrsh");

const useAuth = () => {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = (username, email, password) => {
    setIsLoading(true);
    return new Promise(function(resolve, reject) {
      authApi.signUp(username, email, password)
      .then(signUpResult => {
        setAccessToken(prev => signUpResult.data?.accessToken);
        setIsLoading(false);
        return resolve();
      })
      .catch(signUpErr => {
        setIsLoading(false);
        return reject(signUpErr);
      });
    });
  };

  const signIn = (username, password) => {
    setIsLoading(true);
    return new Promise(function(resolve, reject) {
      authApi.signIn(username, password)
      .then(signInResult => {
        setAccessToken(prev => signInResult?.data?.accessToken);
        setIsLoading(false);
        return resolve();
      })
      .catch(signInErr => {
        setIsLoading(false);
        return reject(signInErr);
      });
    });
  };

  const signOut = () => {
    setIsLoading(true);
    return new Promise(function(resolve, reject) {
      authApi.signOut(accessToken, getRefresh())
      .then(signOutResult => {
        setAccessToken(prev => null);
        setIsLoading(false);
        return resolve();
      })
      .catch(signOutErr => {
        setIsLoading(false);
        return reject(signOutErr);
      });
    });
  };

  const refresh = () => {
    setIsLoading(true);
    return new Promise(function(resolve, reject) {
      authApi.refresh()
      .then(refreshResult => {
        setAccessToken(prev => refreshResult?.data?.accessToken);
        setIsLoading(false);
        return resolve();
      })
      .catch(refreshErr => {
        setIsLoading(false);
        return reject(refreshErr);
      });
    });
  };

  return { accessToken, signIn, signUp, signOut, refresh, isLoading };
};

export default useAuth;
