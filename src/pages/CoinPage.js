// src/pages/CoinPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Typography, Box, CircularProgress, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import Chart from '../components/Chart';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(7); // Default to 7 days

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const [coinRes, chartRes] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: { vs_currency: 'usd', days: days },
          }),
        ]);
        setCoin(coinRes.data);
        setChartData(chartRes.data.prices);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };
    fetchCoinData();
  }, [id, days]);

  const handleDaysChange = (event, newDays) => {
    if (newDays !== null) {
      setDays(newDays);
    }
  };

  if (!coin) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Sanitize the description HTML provided by the API
  const sanitizedDescription = coin.description.en.replace(/<a/g, '<a target="_blank" rel="noopener noreferrer"');

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column: Coin Info */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={coin.image.large} alt={coin.name} style={{ width: 100, marginBottom: '1rem' }} />
            <Typography variant="h4" component="h1" gutterBottom>
              {coin.name} ({coin.symbol.toUpperCase()})
            </Typography>
            <Typography variant="h5" gutterBottom>
              {`$${coin.market_data.current_price.usd.toLocaleString()}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Market Cap Rank: #{coin.market_cap_rank}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: sanitizedDescription.split('. ')[0] + '.' }}
            />
          </Paper>
        </Grid>

        {/* Right Column: Chart */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Chart chartData={chartData} days={days} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <ToggleButtonGroup
                color="primary"
                value={days}
                exclusive
                onChange={handleDaysChange}
                aria-label="time range"
              >
                <ToggleButton value={7}>7D</ToggleButton>
                <ToggleButton value={30}>30D</ToggleButton>
                <ToggleButton value={90}>90D</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoinPage;