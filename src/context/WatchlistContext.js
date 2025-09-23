// src/context/WatchlistContext.js
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create the context
const WatchlistContext = createContext();

// Create a custom hook to easily use the context
export const useWatchlist = () => {
  return useContext(WatchlistContext);
};

// Create the provider component
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