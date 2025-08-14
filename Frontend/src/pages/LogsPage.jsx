import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { useLogs } from '../hooks/useLogs';
import LogsTable from '../components/Logs/LogsTable';
import LogsFilter from '../components/Logs/LogsFilter';
import TimeRangeSelector from '../components/Dashboard/TimeRangeSelector';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const LogsPage = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  
  const { logs, loading, error, page, limit, total, handlePageChange, exportLogs } = useLogs({
    range: timeRange,
    ...filters
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Interface Logs</Typography>
          <div>
            <Button 
              variant="outlined" 
              onClick={() => setShowFilters(!showFilters)}
              sx={{ mr: 2 }}
            >
              {showFilters ? 'Hide Filters' : 'Advanced Filters'}
            </Button>
            <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          </div>
        </Grid>
        
        {showFilters && (
          <Grid item xs={12}>
            <LogsFilter 
              onFilter={(newFilters) => {
                setFilters(newFilters);
                handlePageChange(1);
              }} 
            />
          </Grid>
        )}
        
        <Grid item xs={12}>
          <LogsTable 
            logs={logs} 
            page={page} 
            limit={limit} 
            total={total} 
            onPageChange={handlePageChange}
            onExport={exportLogs}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogsPage;