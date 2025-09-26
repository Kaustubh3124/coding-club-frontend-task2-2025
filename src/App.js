// src/App.js
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// --- CORRECTED IMPORT PATHS ---
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import CoinPage from './pages-CoinPage';
import WatchlistPage from './pages/WatchlistPage';
import { WatchlistProvider } from './context/WatchlistContext';

function App() {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WatchlistProvider>
        <Router>
          <Header toggleColorMode={toggleColorMode} />
          <main>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/coin/:id" element={<CoinPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Routes>
          </main>
        </Router>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;