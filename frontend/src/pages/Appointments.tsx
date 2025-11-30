import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Appointments.module.css';

interface Appointment {
  id: number;
  classe: string;
  navio: string;
  tipo: string;
  servico: string;
  data: string;
  status: 'aberto' | 'em-andamento' | 'concluido' | 'cancelado';
}

const serviceNames: Record<string, string> = {
  'limpeza-completa': 'Limpeza Completa',
  'limpeza-rotina': 'Limpeza de Rotina',
  'inspecao': 'Inspeção',
  'tratamento-quimico': 'Tratamento Químico'
};

const statusNames: Record<string, string> = {
  'aberto': 'Aberto',
  'em-andamento': 'Em Andamento',
  'concluido': 'Concluído',
  'cancelado': 'Cancelado'
};

export default function Appointments() {
  const navigate = useNavigate();
  
  const [appointments] = useState<Appointment[]>([
    { id: 1, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'limpeza-completa', data: '2025-12-05', status: 'aberto' },
    { id: 2, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'limpeza-rotina', data: '2025-12-08', status: 'aberto' },
    { id: 3, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'inspecao', data: '2025-12-14', status: 'aberto' },
    { id: 4, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'limpeza-completa', data: '2025-12-20', status: 'aberto' },
    { id: 5, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'limpeza-rotina', data: '2025-12-05', status: 'em-andamento' },
    { id: 6, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'limpeza-completa', data: '2025-12-08', status: 'em-andamento' },
    { id: 7, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'tratamento-quimico', data: '2025-12-14', status: 'em-andamento' },
    { id: 8, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'limpeza-completa', data: '2025-11-01', status: 'concluido' },
    { id: 9, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'limpeza-rotina', data: '2025-11-07', status: 'concluido' },
    { id: 10, classe: 'Suezmax', navio: 'RAFAEL SANTOS', tipo: 'Petroleiro', servico: 'inspecao', data: '2025-11-30', status: 'concluido' },
    { id: 11, classe: 'Aframax', navio: 'VITÓRIA RÉGIA', tipo: 'Petroleiro', servico: 'limpeza-completa', data: '2025-12-10', status: 'aberto' },
    { id: 12, classe: 'Panamax', navio: 'DOM PEDRO II', tipo: 'Cargueiro', servico: 'limpeza-rotina', data: '2025-12-15', status: 'em-andamento' },
    { id: 13, classe: 'Suezmax', navio: 'MACHADO DE ASSIS', tipo: 'Petroleiro', servico: 'tratamento-quimico', data: '2025-11-20', status: 'concluido' },
    { id: 14, classe: 'Aframax', navio: 'PEDRO ÁLVARES CABRAL', tipo: 'Petroleiro', servico: 'limpeza-completa', data: '2025-12-25', status: 'aberto' },
    { id: 15, classe: 'Panamax', navio: 'RECÔNCAVO BAHIANO', tipo: 'Cargueiro', servico: 'inspecao', data: '2025-12-18', status: 'cancelado' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.navio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !filterClass || app.classe === filterClass;
    const matchesStatus = !filterStatus || app.status === filterStatus;
    const matchesType = !filterType || app.servico === filterType;
    return matchesSearch && matchesClass && matchesStatus && matchesType;
  });

  const stats = {
    total: filteredAppointments.length,
    aberto: filteredAppointments.filter(a => a.status === 'aberto').length,
    emAndamento: filteredAppointments.filter(a => a.status === 'em-andamento').length,
    concluido: filteredAppointments.filter(a => a.status === 'concluido').length
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const handleViewDetails = (id: number) => {
    const app = appointments.find(a => a.id === id);
    if (app) {
      alert(`📋 Detalhes do Agendamento #${id}\n\nNavio: ${app.navio}\nClasse: ${app.classe}\nServiço: ${serviceNames[app.servico]}\nData: ${formatDate(app.data)}\nStatus: ${statusNames[app.status]}`);
    }
  };

  const handleEdit = (id: number) => {
    alert(`✏️ Editar agendamento #${id} (funcionalidade em desenvolvimento)`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('🗑️ Tem certeza que deseja excluir este agendamento?')) {
      alert('✅ Agendamento excluído com sucesso!');
    }
  };

  const handleSchedule = () => {
    alert('📅 Modal de Agendamento (funcionalidade em desenvolvimento)\n\nAqui você poderá:\n- Selecionar o navio\n- Escolher o tipo de serviço\n- Definir a data\n- Adicionar observações');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📋 Agendamentos de Limpeza</h1>
        <div className={styles.headerActions}>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => navigate('/dashboard')}>
            ← Voltar ao Dashboard
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSchedule}>
            + Agendar Limpeza
          </button>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="search">🔍 Buscar por navio</label>
          <input
            type="text"
            id="search"
            className={styles.filterInput}
            placeholder="Digite o nome do navio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="filterClass">🚢 Classe</label>
          <select
            id="filterClass"
            className={styles.filterSelect}
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            <option value="">Todas as classes</option>
            <option value="Suezmax">Suezmax</option>
            <option value="Aframax">Aframax</option>
            <option value="Panamax">Panamax</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="filterStatus">📊 Status</label>
          <select
            id="filterStatus"
            className={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="aberto">Aberto</option>
            <option value="em-andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="filterType">🔧 Tipo de Serviço</label>
          <select
            id="filterType"
            className={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="limpeza-completa">Limpeza Completa</option>
            <option value="limpeza-rotina">Limpeza de Rotina</option>
            <option value="inspecao">Inspeção</option>
            <option value="tratamento-quimico">Tratamento Químico</option>
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total</div>
          <div className={styles.statValue}>{stats.total}</div>
        </div>
        <div className={`${styles.statCard} ${styles.aberto}`}>
          <div className={styles.statLabel}>Aberto</div>
          <div className={styles.statValue}>{stats.aberto}</div>
        </div>
        <div className={`${styles.statCard} ${styles.emAndamento}`}>
          <div className={styles.statLabel}>Em Andamento</div>
          <div className={styles.statValue}>{stats.emAndamento}</div>
        </div>
        <div className={`${styles.statCard} ${styles.concluido}`}>
          <div className={styles.statLabel}>Concluído</div>
          <div className={styles.statValue}>{stats.concluido}</div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Classe</th>
              <th>Nome do Navio</th>
              <th>Tipo</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(app => (
                <tr key={app.id}>
                  <td><strong>{app.classe}</strong></td>
                  <td>{app.navio}</td>
                  <td>{app.tipo}</td>
                  <td>{serviceNames[app.servico]}</td>
                  <td>{formatDate(app.data)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${app.status.charAt(0).toUpperCase() + app.status.slice(1).replace('-', '')}`]}`}>
                      {statusNames[app.status]}
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionBtn} onClick={() => handleViewDetails(app.id)} title="Ver detalhes">👁️</button>
                    <button className={styles.actionBtn} onClick={() => handleEdit(app.id)} title="Editar">✏️</button>
                    <button className={styles.actionBtn} onClick={() => handleDelete(app.id)} title="Excluir">🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>Nenhum agendamento encontrado</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Mostrando {Math.min(10, filteredAppointments.length)} de {filteredAppointments.length} registros
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn}>‹‹</button>
          <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>››</button>
        </div>
      </div>
    </div>
  );
}
