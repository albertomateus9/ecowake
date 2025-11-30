import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão redireciona para /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Páginas principais */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rotas futuras */}
        {/* <Route path="/details/:shipId" element={<Details />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/recommendations" element={<Recommendations />} /> */}
        
        {/* Rota fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}