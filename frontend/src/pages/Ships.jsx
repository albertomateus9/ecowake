import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ship, Search } from 'lucide-react';
import { shipsAPI } from '../services/api';

export default function Ships() {
  const navigate = useNavigate();
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredShips = ships.filter(ship =>
    ship.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.classe.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBiofoulingLevel = (ship) => {
    // Mock - Em produção, vem da API
    const levels = ['Nível 0', 'Nível 1', 'Nível 2', 'Nível 3', 'Nível 4'];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const getBiofoulingColor = (level) => {
    const colors = {
      'Nível 0': 'bg-gray-100 text-gray-800',
      'Nível 1': 'bg-green-100 text-green-800',
      'Nível 2': 'bg-yellow-100 text-yellow-800',
      'Nível 3': 'bg-orange-100 text-orange-800',
      'Nível 4': 'bg-red-100 text-red-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando navios...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Navios</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Ship size={16} />
          <span>{ships.length} navios monitorados</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por navio ou classe..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Ships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShips.map((ship) => {
          const level = getBiofoulingLevel(ship);
          return (
            <div
              key={ship.id}
              onClick={() => navigate(`/navios/${ship.id}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{ship.nome}</h3>
                  <p className="text-sm text-gray-600">{ship.classe}</p>
                </div>
                <Ship className="text-primary" size={24} />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">{ship.tipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Porte (TPB):</span>
                  <span className="font-medium">{ship.porte_tpb.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bioincrustação:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBiofoulingColor(level)}`}>
                    {level}
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-100 transition-colors">
                Ver detalhes
              </button>
            </div>
          );
        })}
      </div>

      {filteredShips.length === 0 && (
        <div className="text-center py-12">
          <Ship className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">Nenhum navio encontrado</p>
        </div>
      )}
    </div>
  );
}
