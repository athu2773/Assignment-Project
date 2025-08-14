import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Paper,
  Typography
} from '@mui/material';

const LogsFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    interfaceName: '',
    integrationKey: '',
    status: '',
    severity: '',
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );
    onFilter(activeFilters);
  };

  const handleReset = () => {
    setFilters({
      interfaceName: '',
      integrationKey: '',
      status: '',
      severity: '',
    });
    onFilter({});
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Advanced Filters</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Interface Name"
              name="interfaceName"
              value={filters.interfaceName}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Integration Key"
              name="integrationKey"
              value={filters.integrationKey}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="SUCCESS">Success</MenuItem>
                <MenuItem value="FAILED">Failed</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Severity</InputLabel>
              <Select
                name="severity"
                value={filters.severity}
                label="Severity"
                onChange={handleChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="CRITICAL">Critical</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" type="submit">
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default LogsFilter;