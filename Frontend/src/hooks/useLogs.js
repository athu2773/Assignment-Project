import { useState } from 'react';
import { useApi } from './useApi';

export const useLogs = (initialFilters = {}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [filters, setFilters] = useState(initialFilters);
  
  const { data, loading, error } = useApi('/api/logs', {
    params: { page, limit, ...filters }
  });
  
  const { data: exportData, fetchData: fetchExport } = useApi('/api/logs/export', {
    skipInitialCall: true,
    responseType: 'blob'
  });

  const handlePageChange = (newPage, newLimit) => {
    setPage(newPage);
    if (newLimit) setLimit(newLimit);
  };

  const exportLogs = async () => {
    await fetchExport({ params: filters });
    if (exportData) {
      const url = window.URL.createObjectURL(exportData);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'interface-logs.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    logs: data?.docs || [],
    total: data?.totalDocs || 0,
    page,
    limit,
    loading,
    error,
    handlePageChange,
    exportLogs,
    setFilters
  };
};