import { useState, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import authApi from '../../../../services/api/AuthApi.js';
import AccessTokenContext from '../../context/auth/AccessTokenContext.js';
const cookies = new Cookies();

const getRefresh = () =>  cookies.get("tometech_rfrsh");

function decodeToken(t) {
  return JSON.parse(window.atob(t.split('.')[1]));
}

const useAuth = () => {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = (username, email, password) => {
    setIsLoading(true);
    return new Promise(function(resolve, reject) {
      authApi.signUp(username, email, password)
      .then(signUpResult => {
        if(signUpResult.code !== 5){
          setIsLoading(false);
          return reject(signUpResult);
        }

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
        if(signInResult.code !== 5){
          setIsLoading(false);
          return reject(signInResult);
        }

        setAccessToken(prev => signInResult?.data?.accessToken);
        setIsLoading(false);

        return resolve(signInResult);
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

  const getRoles = () => {
    if(accessToken){
      let payload = JSON.parse(window.atob(accessToken.split('.')[1]));
      return payload.roles;
    }
    return [];
  };

  return { accessToken, signIn, signUp, signOut, refresh, isLoading, getRoles };
};

export default useAuth;
