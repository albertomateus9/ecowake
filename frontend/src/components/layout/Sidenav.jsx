import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ship, 
  Calendar, 
  Lightbulb, 
  BarChart3,
  Settings,
  FileText
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Ship, label: 'Navios', path: '/navios' },
  { icon: Calendar, label: 'Agendamentos', path: '/agendamentos' },
  { icon: Lightbulb, label: 'Recomendações', path: '/recomendacoes' },
  { icon: BarChart3, label: 'Cenários', path: '/cenarios' },
];

const adminItems = [
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

export default function Sidenav() {
  return (
    <aside className="w-64 bg-primary-200 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-primary-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌊</span>
          <span className="text-xl font-bold text-success">EcoWake</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-3 px-3">Dashboard</p>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-white'
                      : 'text-gray-300 hover:bg-primary-100/50'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-3 px-3">Administrador</p>
          <div className="space-y-1">
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-white'
                      : 'text-gray-300 hover:bg-primary-100/50'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-100">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-gray-300 hover:bg-primary-100/50 rounded-lg transition-colors">
          <FileText size={20} />
          <span className="text-sm font-medium">Documentação</span>
        </button>
      </div>
    </aside>
  );
}
