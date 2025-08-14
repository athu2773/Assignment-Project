import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './contexts/AppProvider';
import theme from './theme';
import DashboardPage from './pages/DashboardPage';
import LogsPage from './pages/LogsPage';
import Layout from './components/common/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/logs" element={<LogsPage />} />
              </Routes>
            </Layout>
          </Router>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;