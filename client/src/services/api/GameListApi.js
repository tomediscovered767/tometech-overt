const getAll = () => {
  return new Promise(function(resolve, reject) {
    fetch('/data/game-list/get-all', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      return resolve(result.data?.list);
    })
    .catch(err => {
      return reject(err);
    });
  });
};

module.exports = { getAll };
