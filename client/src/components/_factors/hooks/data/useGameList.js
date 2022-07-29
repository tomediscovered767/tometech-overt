import { useState, useEffect } from 'react';
import gameListApi from '../../../../services/api/GameListApi.js';

const useGameList = () => {
  const [error, setError] = useState(null);
  const [gameList, setGameList] = useState(null);

  const load = () => {
    gameListApi.getAll()
    .then(result => { setGameList(result); })
    .catch(err => { setError(err); });
  };

  useEffect(() => {
    if(gameList) return;
    load();
  }, []);


  return { gameList, error };
};

export default useGameList;
