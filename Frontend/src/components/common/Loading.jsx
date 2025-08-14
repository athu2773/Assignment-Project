import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="200px"
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" mt={3}>
        {message || 'Loading...'}
      </Typography>
    </Box>
  );
};

export default Loading;