// src/pages/WatchlistPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material';
import { useWatchlist } from './context/WatchlistContext';
import CoinRow from './components/CoinRow';

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (watchlist.length === 0) {
      setLoading(false);
      setCoins([]);
      return;
    }

    const fetchWatchlistCoins = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: watchlist.join(','), // Pass saved coin IDs to the API
          },
        });
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      }
      setLoading(false);
    };

    fetchWatchlistCoins();
  }, [watchlist]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Watchlist
      </Typography>
      {coins.length === 0 ? (
        <Typography>Your watchlist is empty. Add coins from the dashboard by clicking the star icon.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Coin</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">24h Change</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Market Cap</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((coin) => (
                <CoinRow key={coin.id} coin={coin} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default WatchlistPage;