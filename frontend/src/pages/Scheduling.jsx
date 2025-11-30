import { useState } from 'react';
import { Calendar, Ship, Filter, Search, Plus } from 'lucide-react';

export default function Scheduling() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - Em produção vem da API
  const schedules = [
    {
      id: 1,
      shipName: 'RAFAEL SANTOS',
      shipClass: 'Suezmax',
      scheduledDate: '2025-03-15',
      status: 'pending',
      type: 'Limpeza completa',
      location: 'Porto de Santos'
    },
    {
      id: 2,
      shipName: 'VITÓRIA RÉGIA',
      shipClass: 'Aframax',
      scheduledDate: '2025-02-28',
      status: 'confirmed',
      type: 'Limpeza de rotina',
      location: 'Porto do Rio de Janeiro'
    },
    {
      id: 3,
      shipName: 'DOM PEDRO II',
      shipClass: 'Panamax',
      scheduledDate: '2025-04-10',
      status: 'pending',
      type: 'Limpeza completa',
      location: 'Porto de Paranaguá'
    },
    {
      id: 4,
      shipName: 'MACHADO DE ASSIS',
      shipClass: 'Suezmax',
      scheduledDate: '2025-01-20',
      status: 'completed',
      type: 'Inspeção',
      location: 'Porto de Santos'
    },
    {
      id: 5,
      shipName: 'PEDRO ÁLVARES CABRAL',
      shipClass: 'Aframax',
      scheduledDate: '2025-03-05',
      status: 'confirmed',
      type: 'Limpeza completa',
      location: 'Porto de Vitória'
    },
    {
      id: 6,
      shipName: 'RECÔNCAVO BAHIANO',
      shipClass: 'Panamax',
      scheduledDate: '2025-02-15',
      status: 'pending',
      type: 'Limpeza de rotina',
      location: 'Porto de Salvador'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'Pendente', class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmado', class: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Concluído', class: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelado', class: 'bg-red-100 text-red-800' }
    };
    return badges[status] || badges.pending;
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.shipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.shipClass.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || schedule.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
        <button className="flex items-center gap-2 bg-success text-white px-4 py-2 rounded-lg font-medium hover:bg-success/90 transition-colors">
          <Plus size={20} />
          Novo agendamento
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
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

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200">
          <p className="text-sm text-yellow-700 mb-1">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-900">
            {schedules.filter(s => s.status === 'pending').length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">Confirmados</p>
          <p className="text-2xl font-bold text-blue-900">
            {schedules.filter(s => s.status === 'confirmed').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
          <p className="text-sm text-green-700 mb-1">Concluídos</p>
          <p className="text-2xl font-bold text-green-900">
            {schedules.filter(s => s.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Navio
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Classe
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Data
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Tipo
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Local
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSchedules.map((schedule) => {
                const badge = getStatusBadge(schedule.status);
                return (
                  <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Ship size={16} className="text-primary" />
                        <span className="font-medium text-gray-900">{schedule.shipName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{schedule.shipClass}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-900">
                        <Calendar size={16} className="text-gray-400" />
                        {new Date(schedule.scheduledDate).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{schedule.type}</td>
                    <td className="px-6 py-4 text-gray-600">{schedule.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredSchedules.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">Nenhum agendamento encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
