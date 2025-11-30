import { Lightbulb, TrendingDown, DollarSign, Calendar, Ship } from 'lucide-react';

export default function Recommendations() {
  // Mock data - Em produção vem da API
  const recommendations = [
    {
      id: 1,
      shipName: 'RAFAEL SANTOS',
      shipClass: 'Suezmax',
      priority: 'high',
      biofoulingLevel: 3,
      currentFuelConsumption: 112,
      estimatedSavings: 450000,
      recommendedAction: 'Limpeza completa urgente',
      daysUntilCritical: 10,
      roi: '340%'
    },
    {
      id: 2,
      shipName: 'DOM PEDRO II',
      shipClass: 'Panamax',
      priority: 'high',
      biofoulingLevel: 3,
      currentFuelConsumption: 95,
      estimatedSavings: 380000,
      recommendedAction: 'Limpeza completa recomendada',
      daysUntilCritical: 15,
      roi: '310%'
    },
    {
      id: 3,
      shipName: 'VITÓRIA RÉGIA',
      shipClass: 'Aframax',
      priority: 'medium',
      biofoulingLevel: 2,
      currentFuelConsumption: 78,
      estimatedSavings: 220000,
      recommendedAction: 'Limpeza de rotina',
      daysUntilCritical: 30,
      roi: '250%'
    },
    {
      id: 4,
      shipName: 'MACHADO DE ASSIS',
      shipClass: 'Suezmax',
      priority: 'medium',
      biofoulingLevel: 2,
      currentFuelConsumption: 105,
      estimatedSavings: 280000,
      recommendedAction: 'Limpeza preventiva',
      daysUntilCritical: 45,
      roi: '230%'
    },
    {
      id: 5,
      shipName: 'PEDRO ÁLVARES CABRAL',
      shipClass: 'Aframax',
      priority: 'low',
      biofoulingLevel: 1,
      currentFuelConsumption: 72,
      estimatedSavings: 120000,
      recommendedAction: 'Monitoramento contínuo',
      daysUntilCritical: 60,
      roi: '180%'
    },
    {
      id: 6,
      shipName: 'RECÔNCAVO BAHIANO',
      shipClass: 'Panamax',
      priority: 'low',
      biofoulingLevel: 1,
      currentFuelConsumption: 85,
      estimatedSavings: 150000,
      recommendedAction: 'Inspeção programada',
      daysUntilCritical: 90,
      roi: '190%'
    }
  ];

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { label: 'Alta', class: 'bg-red-100 text-red-800' },
      medium: { label: 'Média', class: 'bg-yellow-100 text-yellow-800' },
      low: { label: 'Baixa', class: 'bg-green-100 text-green-800' }
    };
    return badges[priority] || badges.low;
  };

  const totalSavings = recommendations.reduce((acc, rec) => acc + rec.estimatedSavings, 0);
  const highPriority = recommendations.filter(r => r.priority === 'high').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Recomendações</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lightbulb size={16} />
          <span>{recommendations.length} recomendações ativas</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Economia Potencial Total</span>
            <DollarSign size={24} />
          </div>
          <p className="text-3xl font-bold">
            R$ {(totalSavings / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm opacity-90 mt-1">Próximos 12 meses</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Ações Urgentes</span>
            <Lightbulb size={24} />
          </div>
          <p className="text-3xl font-bold">{highPriority}</p>
          <p className="text-sm opacity-90 mt-1">Alta prioridade</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Navios Monitorados</span>
            <Ship size={24} />
          </div>
          <p className="text-3xl font-bold">{recommendations.length}</p>
          <p className="text-sm opacity-90 mt-1">Com recomendações</p>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec) => {
          const badge = getPriorityBadge(rec.priority);
          return (
            <div key={rec.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{rec.shipName}</h3>
                  <p className="text-sm text-gray-600">{rec.shipClass}</p>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                  {badge.label}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Ação Recomendada:</p>
                <p className="text-sm text-gray-700">{rec.recommendedAction}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <TrendingDown size={16} />
                    Nível de bioincrustação:
                  </span>
                  <span className="font-semibold">Nível {rec.biofoulingLevel}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar size={16} />
                    Dias até crítico:
                  </span>
                  <span className="font-semibold">{rec.daysUntilCritical} dias</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <DollarSign size={16} />
                    Economia estimada:
                  </span>
                  <span className="font-semibold text-green-600">
                    R$ {(rec.estimatedSavings / 1000).toFixed(0)}k
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">ROI esperado:</span>
                  <span className="font-bold text-green-600">{rec.roi}</span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-100 transition-colors">
                Agendar limpeza
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
