import { Home, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const routeNames = {
  '/dashboard': 'Página inicial',
  '/navios': 'Navios',
  '/agendamentos': 'Agendamentos',
  '/recomendacoes': 'Recomendações',
};

export default function Header() {
  const location = useLocation();
  const currentRoute = routeNames[location.pathname] || 'Dashboard';

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Home size={16} className="text-gray-400" />
          <span className="text-gray-600">Página inicial</span>
          {location.pathname !== '/dashboard' && (
            <>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="font-medium text-gray-900">{currentRoute}</span>
            </>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Olá, <span className="font-semibold">Administrador</span></span>
          <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
