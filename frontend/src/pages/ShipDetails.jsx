import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ship, AlertTriangle, Calendar, TrendingDown } from 'lucide-react';
import { shipsAPI } from '../services/api';

export default function ShipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ship, setShip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShipDetails();
  }, [id]);

  const loadShipDetails = async () => {
    try {
      const response = await shipsAPI.getById(id);
      setShip(response.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data - Em produção vem da API
  const biofoulingData = {
    level: 3,
    percentage: 68,
    nextCleaning: '2025-03-15',
    lastCleaning: '2024-09-10',
    fuelImpact: '+12%',
    speedReduction: '-8%',
    daysUntilCritical: 45
  };

  const getBiofoulingColor = (level) => {
    const colors = ['gray', 'green', 'yellow', 'orange', 'red'];
    return colors[level] || 'gray';
  };

  const getBiofoulingLabel = (level) => {
    const labels = ['Limpo', 'Leve', 'Moderado', 'Alto', 'Crítico'];
    return labels[level] || 'Desconhecido';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!ship) {
    return (
      <div className="text-center py-12">
        <Ship className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600">Navio não encontrado</p>
        <button onClick={() => navigate('/navios')} className="mt-4 text-primary hover:underline">
          Voltar para lista
        </button>
      </div>
    );
  }

  const color = getBiofoulingColor(biofoulingData.level);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/navios')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{ship.nome}</h1>
          <p className="text-gray-600">{ship.classe} • {ship.tipo}</p>
        </div>
      </div>

      {/* Alert Banner */}
      {biofoulingData.level >= 3 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="text-orange-500" size={24} />
          <div>
            <p className="font-semibold text-orange-900">Atenção necessária</p>
            <p className="text-sm text-orange-700">
              Nível de bioincrustação alto. Limpeza recomendada em {biofoulingData.daysUntilCritical} dias.
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Nível de Bioincrustação</span>
            <Ship size={20} className={`text-${color}-500`} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{biofoulingData.percentage}%</p>
          <p className={`text-sm text-${color}-600 mt-1`}>
            {getBiofoulingLabel(biofoulingData.level)}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Impacto no Combustível</span>
            <TrendingDown size={20} className="text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">{biofoulingData.fuelImpact}</p>
          <p className="text-sm text-gray-600 mt-1">Consumo adicional</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Redução de Velocidade</span>
            <TrendingDown size={20} className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{biofoulingData.speedReduction}</p>
          <p className="text-sm text-gray-600 mt-1">Velocidade média</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Próxima Limpeza</span>
            <Calendar size={20} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {new Date(biofoulingData.nextCleaning).toLocaleDateString('pt-BR')}
          </p>
          <p className="text-sm text-gray-600 mt-1">Em {biofoulingData.daysUntilCritical} dias</p>
        </div>
      </div>

      {/* Biofouling Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Evolução da Bioincrustação</h2>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Nível atual</span>
            <span className="font-semibold">{biofoulingData.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`bg-${color}-500 h-4 rounded-full transition-all`}
              style={{ width: `${biofoulingData.percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Limpo</span>
            <span>Crítico</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-6">
          {['Nível 0', 'Nível 1', 'Nível 2', 'Nível 3', 'Nível 4'].map((label, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-center ${
                index === biofoulingData.level
                  ? `bg-${getBiofoulingColor(index)}-100 border-2 border-${getBiofoulingColor(index)}-500`
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`text-2xl mb-1 ${index === biofoulingData.level ? 'font-bold' : ''}`}>
                {index}
              </div>
              <div className="text-xs text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ship Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Informações do Navio</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Classe:</span>
            <span className="font-semibold">{ship.classe}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Tipo:</span>
            <span className="font-semibold">{ship.tipo}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Porte (TPB):</span>
            <span className="font-semibold">{ship.porte_tpb.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Última Docagem:</span>
            <span className="font-semibold">
              {new Date(biofoulingData.lastCleaning).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
