const signUp = (username, email, password) => {
  return new Promise(function(resolve, reject) {
    fetch('/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
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
    fetch('/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      console.log(response)
      return response.json();
    })
    .then(result => {
      console.log(result)
      resolve(result);
    })
    .catch(err => {
      console.log(err)
      reject(err);
    });
  });
};


const signOut = (token) => {
  return new Promise(function(resolve, reject) {
    fetch('/auth/sign-out', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ token })
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    });
  });
};

module.exports = { signUp, signIn, signOut };
