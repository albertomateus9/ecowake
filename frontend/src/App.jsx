import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Ships from './pages/Ships';
import ShipDetails from './pages/ShipDetails';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="navios" element={<Ships />} />
          <Route path="navios/:id" element={<ShipDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
