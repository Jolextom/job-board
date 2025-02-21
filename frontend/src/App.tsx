import { Routes, Route, Navigate } from 'react-router-dom';
import JobBoard from './pages/job-board';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './pages/register';
import Login from './pages/login';
// import Login from './pages/Login';
// import Register from './pages/Register';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;