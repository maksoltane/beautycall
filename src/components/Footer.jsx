import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isConsultation = location.pathname.startsWith('/consultation');

  if (isConsultation) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-display font-bold text-rose-400">BeautyCall</span>
            </div>
            <p className="text-gray-400 text-sm">
              Consultations video professionnelles pour la beaute et l'esthetique.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-rose-400 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Rejoindre une consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-rose-400 mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">contact@beautycall.fr</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BeautyCall. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
