import { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Droplet, Ship } from 'lucide-react';

export default function Scenarios() {
  const [selectedScenario, setSelectedScenario] = useState('current');

  const scenarios = {
    current: {
      label: 'Cenário Atual',
      description: 'Manutenção conforme programação atual',
      fuelConsumption: 2850,
      maintenanceCost: 4200000,
      emissions: 8950,
      efficiency: 72
    },
    optimized: {
      label: 'Cenário Otimizado',
      description: 'Com recomendações EcoWake implementadas',
      fuelConsumption: 2450,
      maintenanceCost: 5100000,
      emissions: 7680,
      efficiency: 89
    },
    aggressive: {
      label: 'Cenário Agressivo',
      description: 'Limpeza preventiva mensal em toda frota',
      fuelConsumption: 2200,
      maintenanceCost: 6800000,
      emissions: 6900,
      efficiency: 94
    }
  };

  const current = scenarios.current;
  const selected = scenarios[selectedScenario];

  const getSavings = (metric) => {
    const value = selected[metric] - current[metric];
    const percentage = ((value / current[metric]) * 100).toFixed(1);
    return { value, percentage };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cenários e Simulações</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BarChart3 size={16} />
          <span>Análise comparativa</span>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Selecione um cenário</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedScenario === key
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-semibold text-gray-900 mb-1">{scenario.label}</p>
              <p className="text-sm text-gray-600">{scenario.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Consumo de Combustível</span>
            <Droplet size={20} className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{selected.fuelConsumption.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-1">toneladas/ano</p>
          {selectedScenario !== 'current' && (
            <p className={`text-sm mt-2 font-medium ${getSavings('fuelConsumption').value < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {getSavings('fuelConsumption').value < 0 ? '↓' : '↑'} {Math.abs(getSavings('fuelConsumption').percentage)}% vs atual
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Custo de Manutenção</span>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            R$ {(selected.maintenanceCost / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-gray-600 mt-1">por ano</p>
          {selectedScenario !== 'current' && (
            <p className={`text-sm mt-2 font-medium ${getSavings('maintenanceCost').value > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {getSavings('maintenanceCost').value > 0 ? '↑' : '↓'} {Math.abs(getSavings('maintenanceCost').percentage)}% vs atual
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Emissões CO₂</span>
            <TrendingUp size={20} className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{selected.emissions.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-1">toneladas/ano</p>
          {selectedScenario !== 'current' && (
            <p className={`text-sm mt-2 font-medium ${getSavings('emissions').value < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {getSavings('emissions').value < 0 ? '↓' : '↑'} {Math.abs(getSavings('emissions').percentage)}% vs atual
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Eficiência Operacional</span>
            <Ship size={20} className="text-primary" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{selected.efficiency}%</p>
          <p className="text-xs text-gray-600 mt-1">da frota</p>
          {selectedScenario !== 'current' && (
            <p className={`text-sm mt-2 font-medium ${getSavings('efficiency').value > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {getSavings('efficiency').value > 0 ? '↑' : '↓'} {Math.abs(getSavings('efficiency').value)} pontos
            </p>
          )}
        </div>
      </div>

      {/* ROI Analysis */}
      {selectedScenario !== 'current' && (
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Análise de Retorno (ROI)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm opacity-90 mb-1">Investimento Adicional</p>
              <p className="text-3xl font-bold">
                R$ {((selected.maintenanceCost - current.maintenanceCost) / 1000000).toFixed(1)}M
              </p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Economia Anual</p>
              <p className="text-3xl font-bold">
                R$ {(((current.fuelConsumption - selected.fuelConsumption) * 5000) / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs opacity-75">Combustível a R$ 5.000/ton</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Payback</p>
              <p className="text-3xl font-bold">
                {(((selected.maintenanceCost - current.maintenanceCost) / ((current.fuelConsumption - selected.fuelConsumption) * 5000)) * 12).toFixed(1)} meses
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
