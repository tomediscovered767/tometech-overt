import authApi from '../../../../services/api/AuthApi.js';

// useAuthAPI extracts all API auth requests away from React components
const useAuth = () => {
  const signUp = (username, email, password) => {
    return new Promise(function(resolve, reject) {
      authApi.signUp(username, email, password)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      });
    });
  };

  const signIn = (username, password) => {
    return new Promise(function(resolve, reject) {
      authApi.signIn(username, password)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      });
    });
  };

  const signOut = (token) => {
    return new Promise(function(resolve, reject) {
      authApi.signOut(token)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      });
    });
  };

  return { signIn, signUp, signOut };
};

export default useAuth;
