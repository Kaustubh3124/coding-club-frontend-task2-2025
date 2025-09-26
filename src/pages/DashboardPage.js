// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CoinRow from '../components/coinRow'; 
import Pagination from '../components/Pagination';

const DashboardPage = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  // New state for filters
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100, // Fetch more to make filtering more effective
            page: page,
            sparkline: false,
          },
        });
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchCoins();
  }, [page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCoins = coins
    .filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // Apply sorting based on the filter
      if (filter === 'gainers') {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
      if (filter === 'losers') {
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
      return 0; // Default order (market cap)
    });

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Search for a coin..."
          variant="outlined"
          fullWidth
          onChange={handleSearch}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filter}
            label="Filter By"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="gainers">Top Gainers (24h)</MenuItem>
            <MenuItem value="losers">Top Losers (24h)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="crypto table">
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
              {filteredCoins.map((coin) => (
                <CoinRow key={coin.id} coin={coin} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination page={page} setPage={setPage} />
    </Container>
  );
};

export default DashboardPage;