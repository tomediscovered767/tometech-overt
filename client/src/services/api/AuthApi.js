const signUp = (username, email, password) => {
  return new Promise(function(resolve, reject) {
    fetch('/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      return resolve(result);
    })
    .catch(err => {
      console.log(err)
      return reject(err);
    });
  });
};


const signIn = (username, password) => {
  return new Promise(function(resolve, reject) {
    fetch('/auth/sign-in', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      return resolve(result);
    })
    .catch(err => {
      console.log(err)
      return reject(err);
    });
  });
};


const signOut = (accessToken, refreshToken) => {
  return new Promise(function(resolve, reject) {
    fetch('/auth/sign-out', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ accessToken, refreshToken })
    })
    .then(response => {
      return resolve();
    })
    .catch(err => {
      console.log(err)
      return reject(err);
    });
  });
};

const refresh = () => {
  return new Promise(function(resolve, reject) {
    console.log("Attempting authentication refresh: ");
    fetch('/auth/refresh', {
      mode: "cors",
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      if(response.status !== 200){
        return resolve();
      }

      return response.json();
    })
    .then(result => {
      return resolve(result);
    })
    .catch(err => {
      console.log(err)
      return reject(err);
    });
  });
};

module.exports = { signUp, signIn, signOut, refresh };
