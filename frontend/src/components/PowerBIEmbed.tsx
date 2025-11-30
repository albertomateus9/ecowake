import React, { useState, useEffect } from 'react';
import apiClient, { Ship } from '../services/api';

interface PowerBIEmbedProps {
  reportUrl?: string;
  fallbackTitle?: string;
}

export const PowerBIEmbed: React.FC<PowerBIEmbedProps> = ({
  reportUrl = '/reports/transpetro.pbix',
  fallbackTitle = 'Análise de Bioincrustação'
}) => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [showPBIX, setShowPBIX] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShipsData();
  }, []);

  const loadShipsData = async () => {
    try {
      const data = await apiClient.getShips();
      setShips(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePBIXError = () => {
    console.warn('Power BI não disponível, usando fallback');
    setShowPBIX(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showPBIX && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-xl font-bold p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            📊 {fallbackTitle}
          </h3>
          <iframe
            src={reportUrl}
            width="100%"
            height="600"
            frameBorder="0"
            onError={handlePBIXError}
            style={{ display: showPBIX ? 'block' : 'none' }}
            title="Power BI Report"
          />
        </div>
      )}

      {!showPBIX && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            📊 Dashboard de Bioincrustação
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ships.map((ship) => (
              <div
                key={ship.id}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-4 border border-blue-200"
              >
                <h4 className="font-bold text-gray-800">{ship.name}</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-blue-600">{ship.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bioincrustação:</span>
                    <span className="font-semibold">{ship.biofouling_level}/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Velocidade:</span>
                    <span className="font-semibold">{ship.speed} nós</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consumo:</span>
                    <span className="font-semibold">{ship.fuel_consumption} t/dia</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PowerBIEmbed;
