import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const timeRanges = [
  { value: '1h', label: 'Last Hour' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: 'week', label: 'Last Week' },
  { value: 'month', label: 'Last Month' },
  { value: 'all', label: 'All Time' },
];

const TimeRangeSelector = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="time-range-label">Time Range</InputLabel>
      <Select
        labelId="time-range-label"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Time Range"
      >
        {timeRanges.map((range) => (
          <MenuItem key={range.value} value={range.value}>
            {range.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TimeRangeSelector;