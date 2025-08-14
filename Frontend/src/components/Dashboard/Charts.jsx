import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts = ({ data }) => {
  // Transform data for chart
  const chartData = React.useMemo(() => {
    if (!data) return [];
    
    const hourlyMap = {};
    
    data.forEach(item => {
      const hour = item._id.hour;
      if (!hourlyMap[hour]) {
        hourlyMap[hour] = { hour: `${hour}:00`, success: 0, failed: 0 };
      }
      hourlyMap[hour][item._id.status.toLowerCase()] = item.count;
    });
    
    return Object.values(hourlyMap);
  }, [data]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Hourly Execution Stats
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="success" fill="#4caf50" name="Successful" />
            <Bar dataKey="failed" fill="#f44336" name="Failed" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Charts;