import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const SummaryCards = ({ data }) => {
  const cards = [
    { title: 'Total Executions', value: data?.total || 0, color: 'primary.main' },
    { title: 'Successful', value: data?.success || 0, color: 'success.main' },
    { title: 'Failed', value: data?.failed || 0, color: 'error.main' },
    { title: 'Success Rate', 
      value: data?.total ? `${Math.round((data.success / data.total) * 100)}%` : '0%', 
      color: 'text.primary' 
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StyledCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="h4" component="div" sx={{ color: card.color }}>
                {card.value}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;