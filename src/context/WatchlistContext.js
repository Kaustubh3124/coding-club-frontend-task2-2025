
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);

  const addCoin = (coinId) => {
    if (!watchlist.includes(coinId)) {
      setWatchlist([...watchlist, coinId]);
    }
  };

  const removeCoin = (coinId) => {
    setWatchlist(watchlist.filter((id) => id !== coinId));
  };

  const value = {
    watchlist,
    addCoin,
    removeCoin,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};