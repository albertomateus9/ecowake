import { useEffect, useState } from 'react';
import { Ship, AlertTriangle, Calendar, Lightbulb } from 'lucide-react';
import Header from '../components/Header';

export default function Dashboard() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar navios da API
    fetch('/api/ships')
      .then(res => res.json())
      .then(data => {
        setShips(data.ships || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar navios:', err);
        setLoading(false);
      });
  }, []);

  const stats = [
    {
      title: 'Navios monitorados',
      value: ships.length,
      icon: Ship,
      bgColor: 'bg-blue-100',
      iconBgColor: 'bg-blue-500',
    },
    {
      title: 'Atenção crítica',
      value: ships.filter(s => s.biofouling_level >= 3).length,
      icon: AlertTriangle,
      bgColor: 'bg-red-100',
      iconBgColor: 'bg-red-500',
    },
    {
      title: 'Agendamentos',
      value: '6',
      icon: Calendar,
      bgColor: 'bg-yellow-100',
      iconBgColor: 'bg-yellow-600',
    },
    {
      title: 'Recomendações',
      value: '8',
      icon: Lightbulb,
      bgColor: 'bg-green-100',
      iconBgColor: 'bg-green-500',
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className={`${stat.bgColor} rounded-lg shadow-md p-6 flex items-center justify-between border border-gray-200`}
                >
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.iconBgColor} rounded-lg p-4 text-white flex-shrink-0`}>
                    <Icon size={32} strokeWidth={2} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ships Table */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🚢 Frota</h2>
            {loading ? (
              <p className="text-gray-600">Carregando...</p>
            ) : ships.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Navio</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Bioincrustação</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Combustível</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Velocidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ships.map((ship) => (
                      <tr key={ship.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{ship.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ship.status === 'Operando' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {ship.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-900">{ship.biofouling_level}/4</td>
                        <td className="py-3 px-4 text-gray-900">{ship.fuel_consumption.toFixed(1)} L/h</td>
                        <td className="py-3 px-4 text-gray-900">{ship.speed} nó</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">Nenhum navio encontrado</p>
            )}
          </div>

          {/* Power BI Section */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 Análises - Power BI</h2>
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg border-2 border-dashed border-teal-300 p-12 text-center">
              <p className="text-gray-700 font-medium mb-4">📁 Arquivo Power BI disponível</p>
              <a 
                href="/reports/transpetro.pbix"
                download="transpetro.pbix"
                className="inline-block bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition shadow-lg"
              >
                ⬇️ Baixar transpetro.pbix
              </a>
              <p className="text-gray-500 text-sm mt-6">
                Abra em Microsoft Power BI Desktop para análises completas
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
