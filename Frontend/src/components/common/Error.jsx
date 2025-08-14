import React from 'react';
import { Alert, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(Alert)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: 600,
}));

const Error = ({ message, onRetry }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
      <StyledAlert severity="error">
        <Typography variant="h6" gutterBottom>
          Error Occurred
        </Typography>
        <Typography paragraph>{message || 'An unexpected error occurred.'}</Typography>
        {onRetry && (
          <Box mt={2}>
            <Button 
              variant="contained" 
              color="error" 
              onClick={onRetry}
            >
              Retry
            </Button>
          </Box>
        )}
      </StyledAlert>
    </Box>
  );
};

export default Error;