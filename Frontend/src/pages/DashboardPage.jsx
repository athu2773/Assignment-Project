import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import SummaryCards from '../components/Dashboard/SummaryCards';
import Charts from '../components/Dashboard/Charts';
import TimeRangeSelector from '../components/Dashboard/TimeRangeSelector';
import { useApi } from '../hooks/useApi';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const { data: summary, loading, error, fetchData } = useApi('/summary');
  
  useEffect(() => {
    fetchData({ params: { range: timeRange } });
  }, [timeRange, fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Interface Monitoring Dashboard</Typography>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </Grid>
        
        <Grid item xs={12}>
          <SummaryCards data={summary} />
        </Grid>
        
        <Grid item xs={12}>
          <Charts data={summary?.hourlyStats} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;