// src/components/CoinRow.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TableRow, TableCell, Avatar, Typography, Box, Link } from '@mui/material';

const CoinRow = ({ coin }) => {
  const priceChange = coin.price_change_percentage_24h;
  const priceChangeColor = priceChange > 0 ? 'success.main' : 'error.main'; // Use theme colors

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        <Link component={RouterLink} to={`/coin/${coin.id}`} color="inherit" underline="none">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={coin.image} alt={coin.name} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{coin.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                {coin.symbol}
              </Typography>
            </Box>
          </Box>
        </Link>
      </TableCell>
      <TableCell align="right">${coin.current_price.toLocaleString()}</TableCell>
      <TableCell align="right" sx={{ color: priceChangeColor }}>
        {priceChange.toFixed(2)}%
      </TableCell>
      <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
        ${coin.market_cap.toLocaleString()}
      </TableCell>
      <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
        ${coin.total_volume.toLocaleString()}
      </TableCell>
    </TableRow>
  );
};

export default CoinRow;