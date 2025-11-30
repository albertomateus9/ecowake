export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/images/logo-ecowake.png" 
            alt="EcoWake Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
        <nav className="flex gap-6">
          <a href="/" className="text-gray-700 text-sm font-medium hover:text-teal-600">
            Dashboard
          </a>
          <a href="/detalhes" className="text-gray-700 text-sm font-medium hover:text-teal-600">
            Detalhes
          </a>
          <a href="/agendamentos" className="text-gray-700 text-sm font-medium hover:text-teal-600">
            Agendamentos
          </a>
        </nav>
      </div>
    </header>
  );
}
