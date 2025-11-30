import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Filter, Ship, AlertCircle, TrendingDown, Zap } from 'lucide-react';
import './Dashboard.module.css';

interface Ship {
  id: number;
  name: string;
  status: string;
  biofouling_level: number;
  fuel_consumption: number;
  speed: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  const userName = localStorage.getItem('userName') || 'Usuário';
  const userRole = localStorage.getItem('userRole') || 'Operador';

  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    try {
      setLoading(true);
      // Simulando dados da API
      const mockShips: Ship[] = [
        {
          id: 1,
          name: 'RAFAEL SANTOS',
          status: 'Operando',
          biofouling_level: 3,
          fuel_consumption: 48.5,
          speed: 14.2
        },
        {
          id: 2,
          name: 'TRANSPETRO BRASIL',
          status: 'Manutenção',
          biofouling_level: 2,
          fuel_consumption: 52.1,
          speed: 0.0
        },
        {
          id: 3,
          name: 'OCEANO EXPRESS',
          status: 'Operando',
          biofouling_level: 1,
          fuel_consumption: 38.2,
          speed: 16.5
        },
        {
          id: 4,
          name: 'SUEZMAX 01',
          status: 'Operando',
          biofouling_level: 2,
          fuel_consumption: 48.9,
          speed: 15.1
        },
        {
          id: 5,
          name: 'AFRAMAX 02',
          status: 'Operando',
          biofouling_level: 3,
          fuel_consumption: 45.3,
          speed: 13.8
        },
        {
          id: 6,
          name: 'PANAMAX 03',
          status: 'Parado',
          biofouling_level: 4,
          fuel_consumption: 0,
          speed: 0.0
        }
      ];
      setShips(mockShips);
    } catch (error) {
      console.error('Erro ao buscar navios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const getRiskLevel = (level: number) => {
    if (level === 4) return 'critical';
    if (level === 3) return 'warning';
    if (level === 2) return 'medium';
    return 'low';
  };

  const getRiskLabel = (level: number) => {
    const labels = ['Baixo', 'Médio', 'Alto', 'Crítico'];
    return labels[level] || 'Desconhecido';
  };

  // Filtrar navios
  let filteredShips = ships.filter(ship => {
    const matchSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || ship.status === filterStatus;
    const matchRisk = 
      filterRisk === 'all' || 
      (filterRisk === 'critical' && ship.biofouling_level === 4) ||
      (filterRisk === 'warning' && ship.biofouling_level === 3) ||
      (filterRisk === 'medium' && ship.biofouling_level === 2) ||
      (filterRisk === 'low' && ship.biofouling_level === 1);
    
    return matchSearch && matchStatus && matchRisk;
  });

  // Calcular métricas
  const totalShips = ships.length;
  const shipsAtRisk = ships.filter(s => s.biofouling_level >= 3).length;
  const avgFuelConsumption = (ships.reduce((sum, s) => sum + s.fuel_consumption, 0) / ships.length).toFixed(1);
  const avgSpeed = (ships.reduce((sum, s) => sum + s.speed, 0) / ships.length).toFixed(1);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <h1>🌊 EcoWake</h1>
            <p>Dashboard de Monitoramento</p>
          </div>
          
          <div className="header-user">
            <div className="user-info">
              <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <p className="user-name">{userName}</p>
                <p className="user-role">{userRole}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Sair">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Métricas */}
        <section className="metrics-section">
          <div className="metric-card">
            <div className="metric-icon ships">
              <Ship size={24} />
            </div>
            <div className="metric-content">
              <p className="metric-label">Total de Navios</p>
              <p className="metric-value">{totalShips}</p>
            </div>
          </div>

          <div className="metric-card alert">
            <div className="metric-icon warning">
              <AlertCircle size={24} />
            </div>
            <div className="metric-content">
              <p className="metric-label">Em Risco</p>
              <p className="metric-value">{shipsAtRisk}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon fuel">
              <Zap size={24} />
            </div>
            <div className="metric-content">
              <p className="metric-label">Consumo Médio</p>
              <p className="metric-value">{avgFuelConsumption} t/dia</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon speed">
              <TrendingDown size={24} />
            </div>
            <div className="metric-content">
              <p className="metric-label">Velocidade Média</p>
              <p className="metric-value">{avgSpeed} nós</p>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar navio por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <Filter size={20} />
            
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Todos os Status</option>
              <option value="Operando">Operando</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Parado">Parado</option>
            </select>

            <select value={filterRisk} onChange={(e) => setFilterRisk(e.target.value)}>
              <option value="all">Todos os Riscos</option>
              <option value="low">Baixo Risco</option>
              <option value="medium">Médio Risco</option>
              <option value="warning">Alto Risco</option>
              <option value="critical">Crítico</option>
            </select>
          </div>

          <div className="filter-results">
            {filteredShips.length} de {ships.length} navios
          </div>
        </section>

        {/* Ships Grid */}
        <section className="ships-section">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Carregando navios...</p>
            </div>
          ) : filteredShips.length === 0 ? (
            <div className="empty-state">
              <Ship size={48} />
              <p>Nenhum navio encontrado</p>
            </div>
          ) : (
            <div className="ships-grid">
              {filteredShips.map(ship => (
                <div 
                  key={ship.id} 
                  className={`ship-card risk-${getRiskLevel(ship.biofouling_level)}`}
                  onClick={() => navigate(`/details/${ship.id}`)}
                >
                  {/* Header */}
                  <div className="ship-card-header">
                    <h3>{ship.name}</h3>
                    <span className={`status-badge status-${ship.status.toLowerCase()}`}>
                      {ship.status}
                    </span>
                  </div>

                  {/* Biofouling Level */}
                  <div className="biofouling-indicator">
                    <div className="biofouling-label">
                      <span>Bioincrustação</span>
                      <span className="biofouling-level">{ship.biofouling_level}/4</span>
                    </div>
                    <div className="biofouling-bar">
                      <div 
                        className="biofouling-fill"
                        style={{ width: `${(ship.biofouling_level / 4) * 100}%` }}
                      ></div>
                    </div>
                    <p className="risk-label">{getRiskLabel(ship.biofouling_level)}</p>
                  </div>

                  {/* Stats */}
                  <div className="ship-stats">
                    <div className="stat">
                      <p className="stat-label">Velocidade</p>
                      <p className="stat-value">{ship.speed.toFixed(1)}</p>
                      <p className="stat-unit">nós</p>
                    </div>
                    <div className="stat">
                      <p className="stat-label">Consumo</p>
                      <p className="stat-value">{ship.fuel_consumption.toFixed(1)}</p>
                      <p className="stat-unit">t/dia</p>
                    </div>
                  </div>

                  {/* Action */}
                  <button className="view-details-btn">
                    Ver Detalhes →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}