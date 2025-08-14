import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Typography
} from '@mui/material';
import { Download, Refresh } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const statusColors = {
  SUCCESS: 'success',
  FAILED: 'error',
  PENDING: 'warning',
};

const severityColors = {
  LOW: 'info',
  MEDIUM: 'secondary',
  HIGH: 'warning',
  CRITICAL: 'error',
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const LogsTable = ({ logs, page, limit, total, onPageChange, onExport }) => {
  const handleChangePage = (_, newPage) => {
    onPageChange(newPage + 1, limit);
  };

  const handleChangeRowsPerPage = (event) => {
    onPageChange(1, parseInt(event.target.value, 10));
  };

  return (
    <Paper elevation={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h6">Interface Logs</Typography>
        <Box>
          <Tooltip title="Refresh">
            <IconButton onClick={() => onPageChange(page, limit)}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export to CSV">
            <IconButton onClick={onExport}>
              <Download />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Interface Name</TableCell>
              <TableCell>Integration Key</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <StyledTableRow key={log._id}>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{log.interfaceName}</TableCell>
                <TableCell>{log.integrationKey}</TableCell>
                <TableCell>
                  <Chip 
                    label={log.status} 
                    color={statusColors[log.status] || 'default'} 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {log.severity && (
                    <Chip 
                      label={log.severity} 
                      color={severityColors[log.severity] || 'default'} 
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%'
                    }}
                    title={log.message}
                  >
                    {log.message}
                  </Box>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={limit}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LogsTable;