import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Anchor, BarChart3, Settings } from 'lucide-react';
import './Login.module.css';

interface UserProfile {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const profiles: UserProfile[] = [
  {
    id: 'captain',
    name: 'Capitão',
    role: 'Gerente de Navio',
    icon: <Anchor size={32} />,
    description: 'Monitore seu navio em tempo real',
    color: '#667eea'
  },
  {
    id: 'fleet-manager',
    name: 'Gestor de Frota',
    role: 'Administrador de Frota',
    icon: <BarChart3 size={32} />,
    description: 'Gerencie toda a frota Transpetro',
    color: '#764ba2'
  },
  {
    id: 'analyst',
    name: 'Analista',
    role: 'Especialista em Dados',
    icon: <Settings size={32} />,
    description: 'Analise dados de bioincrustação',
    color: '#f093fb'
  }
];

export default function Login() {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectProfile = async (profileId: string) => {
    setSelectedProfile(profileId);
    setLoading(true);

    setTimeout(() => {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        localStorage.setItem('userProfile', profileId);
        localStorage.setItem('userName', profile.name);
        localStorage.setItem('userRole', profile.role);
        localStorage.setItem('authToken', `token-${profileId}`);
        navigate('/dashboard');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>

      <div className="login-content">
        <div className="login-header">
          <img 
            src="/images/logo-ecowake.png" 
            alt="EcoWake Logo" 
            className="login-logo"
          />
          <h1>EcoWake</h1>
          <p className="subtitle">Sistema de Monitoramento de Bioincrustação</p>
          <p className="description">Selecione seu perfil para continuar</p>
        </div>

        <div className="profiles-grid">
          {profiles.map(profile => (
            <button
              key={profile.id}
              className={`profile-card ${selectedProfile === profile.id ? 'active' : ''} ${loading && selectedProfile !== profile.id ? 'disabled' : ''}`}
              onClick={() => handleSelectProfile(profile.id)}
              disabled={loading && selectedProfile !== profile.id}
              style={{
                '--profile-color': profile.color
              } as React.CSSProperties}
            >
              {loading && selectedProfile === profile.id && (
                <div className="loading-spinner"></div>
              )}

              <div className="profile-icon">
                {profile.icon}
              </div>

              <div className="profile-content">
                <h3>{profile.name}</h3>
                <p className="role">{profile.role}</p>
                <p className="description-small">{profile.description}</p>
              </div>

              <div className="profile-arrow">
                <ChevronRight size={24} />
              </div>
            </button>
          ))}
        </div>

        <div className="login-footer">
          <p>
            Este é um ambiente de demonstração para o Hackathon Transpetro 2025
          </p>
          <p className="version">
            EcoWake v1.0.0 • Protótipo
          </p>
        </div>
      </div>

      <div className="login-info">
        <div className="info-content">
          <h2>Bem-vindo ao EcoWake</h2>
          
          <div className="info-card">
            <h3>📊 Análise em Tempo Real</h3>
            <p>Monitore os níveis de bioincrustação da frota Transpetro em tempo real</p>
          </div>

          <div className="info-card">
            <h3>🚢 Dados Reais AIS</h3>
            <p>Dados de posicionamento e velocidade dos 20 navios da frota</p>
          </div>

          <div className="info-card">
            <h3>⚡ Economia de Combustível</h3>
            <p>Reduza consumo em até 30% com manutenção preventiva</p>
          </div>

          <div className="info-card">
            <h3>🌍 Sustentabilidade</h3>
            <p>Diminua emissões de CO₂ com limpeza otimizada de cascos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
