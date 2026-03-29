import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isConsultation = location.pathname.startsWith('/consultation');

  if (isConsultation) {
    return null;
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
              BeautyCall
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/join" className="text-gray-600 hover:text-rose-500 transition-colors font-medium">
              Rejoindre
            </Link>
          </nav>

          <Link to="/join" className="btn-primary text-sm">
            Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
