
import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

const Pagination = ({ page, setPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); 
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <MuiPagination
        count={100} 
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;