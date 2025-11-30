import { useEffect, useState } from 'react';
import { Ship, AlertTriangle, Calendar, Lightbulb } from 'lucide-react';
import { shipsAPI } from '../services/api';

export default function Dashboard() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShips();
  }, []);

  const loadShips = async () => {
    try {
      const response = await shipsAPI.getAll();
      setShips(response.data.data || []);
    } catch (error) {
      console.error('Erro ao carregar navios:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Ship, label: 'Navios monitorados', value: ships.length, color: 'bg-blue-500' },
    { icon: AlertTriangle, label: 'Atenção crítica', value: 2, color: 'bg-red-500' },
    { icon: Calendar, label: 'Agendamentos', value: 6, color: 'bg-yellow-500' },
    { icon: Lightbulb, label: 'Recomendações', value: 6, color: 'bg-green-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status da Frota */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Status da frota</h2>
        
        <div className="space-y-4">
          {ships.slice(0, 5).map((ship) => (
            <div key={ship.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">{ship.nome}</h3>
                <p className="text-sm text-gray-600">{ship.classe} - {ship.tipo}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Normal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
