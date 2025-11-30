import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Droplet, Zap, AlertCircle } from 'lucide-react';
import styles from './Details.module.css';

interface Ship {
  id: string;
  name: string;
  type: string;
  status: 'Operando' | 'Manutenção' | 'Parado';
  biofouling: number;
  speed: number;
  consumption: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

export default function Details() {
  const { shipId } = useParams();
  const navigate = useNavigate();

  // Dados simulados - em produção viriam da API
  const ship: Ship = {
    id: shipId || '1',
    name: 'RAFAEL SANTOS',
    type: 'Suezmax',
    status: 'Operando',
    biofouling: 3,
    speed: 12.5,
    consumption: 45.2,
    lastMaintenance: '2025-10-15',
    nextMaintenance: '2025-12-10',
  };

  const maintenanceHistory = [
    { date: '2025-10-15', type: 'Limpeza Hull', duration: '3 dias', cost: 'R$ 85.000' },
    { date: '2025-08-20', type: 'Inspeção Visual', duration: '1 dia', cost: 'R$ 12.000' },
    { date: '2025-06-10', type: 'Limpeza Completa', duration: '5 dias', cost: 'R$ 120.000' },
    { date: '2025-04-05', type: 'Tratamento Químico', duration: '2 dias', cost: 'R$ 35.000' },
  ];

  const getRiskColor = (level: number) => {
    if (level >= 4) return '#f56565'; // Crítico - Vermelho
    if (level >= 3) return '#ed8936'; // Alto - Laranja
    if (level >= 2) return '#ecc94b'; // Médio - Amarelo
    return '#48bb78'; // Baixo - Verde
  };

  const getRiskLabel = (level: number) => {
    if (level >= 4) return 'Crítico';
    if (level >= 3) return 'Alto';
    if (level >= 2) return 'Médio';
    return 'Baixo';
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backButton} onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={24} />
            Voltar
          </button>
          <div className={styles.headerTitle}>
            <h1>{ship.name}</h1>
            <span className={styles.shipType}>{ship.type}</span>
          </div>
          <div className={styles.headerStatus}>
            <span className={`${styles.status} ${styles[`status-${ship.status.toLowerCase()}`]}`}>
              {ship.status}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Alerta de Bioincrustação */}
        {ship.biofouling >= 3 && (
          <div className={styles.alert}>
            <AlertCircle size={20} />
            <div>
              <h3>Limpeza Urgente Recomendada</h3>
              <p>Nível de bioincrustação em {getRiskLabel(ship.biofouling)} ({ship.biofouling}/4). Recomenda-se agendar limpeza em até 10 dias.</p>
            </div>
          </div>
        )}

        {/* Cards de Métricas */}
        <section className={styles.metrics}>
          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: getRiskColor(ship.biofouling) }}>
              <Droplet size={24} color="white" />
            </div>
            <div className={styles.metricContent}>
              <p className={styles.metricLabel}>Bioincrustação</p>
              <p className={styles.metricValue}>{ship.biofouling}/4</p>
              <p className={styles.metricStatus}>{getRiskLabel(ship.biofouling)}</p>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: '#3b82f6' }}>
              <Zap size={24} color="white" />
            </div>
            <div className={styles.metricContent}>
              <p className={styles.metricLabel}>Velocidade</p>
              <p className={styles.metricValue}>{ship.speed}</p>
              <p className={styles.metricStatus}>nós</p>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: '#8b5cf6' }}>
              <Droplet size={24} color="white" />
            </div>
            <div className={styles.metricContent}>
              <p className={styles.metricLabel}>Consumo Diário</p>
              <p className={styles.metricValue}>{ship.consumption}</p>
              <p className={styles.metricStatus}>t/dia</p>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricIcon} style={{ background: '#ec4899' }}>
              <Calendar size={24} color="white" />
            </div>
            <div className={styles.metricContent}>
              <p className={styles.metricLabel}>Próxima Manutenção</p>
              <p className={styles.metricValue}>{new Date(ship.nextMaintenance).toLocaleDateString('pt-BR')}</p>
              <p className={styles.metricStatus}>Agendado</p>
            </div>
          </div>
        </section>

        {/* Gráfico Simulado */}
        <section className={styles.chartSection}>
          <h2>Histórico de Bioincrustação (90 dias)</h2>
          <div className={styles.chart}>
            <div className={styles.chartBars}>
              {[1, 1.5, 2, 2.2, 2.8, 2.9, 3, 3.1, 3.2, 3.3].map((val, i) => (
                <div
                  key={i}
                  className={styles.bar}
                  style={{
                    height: `${(val / 4) * 100}%`,
                    background: getRiskColor(Math.round(val)),
                  }}
                  title={`Dia ${i + 1}: ${val.toFixed(1)}/4`}
                />
              ))}
            </div>
            <div className={styles.chartLegend}>
              <span>Baixo</span>
              <span>Médio</span>
              <span>Alto</span>
              <span>Crítico</span>
            </div>
          </div>
        </section>

        {/* Histórico de Manutenção */}
        <section className={styles.historySection}>
          <h2>Histórico de Manutenção</h2>
          <div className={styles.historyTable}>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo de Serviço</th>
                  <th>Duração</th>
                  <th>Custo</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceHistory.map((item, i) => (
                  <tr key={i}>
                    <td>{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                    <td>{item.type}</td>
                    <td>{item.duration}</td>
                    <td className={styles.cost}>{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Button */}
        <section className={styles.ctaSection}>
          <button className={styles.scheduleButton}>
            <Calendar size={20} />
            Agendar Limpeza
          </button>
        </section>
      </main>
    </div>
  );
}