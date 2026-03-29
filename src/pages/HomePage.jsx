import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-medium mb-6">
                Consultations video professionnelles
              </span>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
                Votre beaute,{' '}
                <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                  sublimee
                </span>{' '}
                par des experts
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Connectez-vous en video avec des professionnels de la beaute et de l'esthetique.
                Des conseils personnalises, depuis le confort de votre domicile.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/join" className="btn-primary text-lg px-8 py-4">
                  Demarrer une consultation
                </Link>
                <a href="#features" className="btn-secondary text-lg px-8 py-4">
                  En savoir plus
                </a>
              </div>
            </div>

            <div className="hidden lg:flex justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-br from-rose-300 to-rose-500 rounded-3xl shadow-2xl transform rotate-3 flex items-end justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="relative p-6 text-white text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="font-display font-semibold text-lg">Consultation en direct</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gold-300 rounded-2xl shadow-lg transform -rotate-12 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gold-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Pourquoi choisir BeautyCall ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une plateforme conçue pour offrir la meilleure experience de consultation beaute en ligne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center group">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl mx-auto mb-5 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">Video HD en direct</h3>
              <p className="text-gray-600">
                Consultations video haute definition avec une connexion stable et securisee grace a la technologie WebRTC.
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-gold-100 rounded-2xl mx-auto mb-5 flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                <svg className="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">Confidentiel et securise</h3>
              <p className="text-gray-600">
                Vos consultations restent privees. Chiffrement de bout en bout pour proteger votre vie privee.
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl mx-auto mb-5 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">Experts certifies</h3>
              <p className="text-gray-600">
                Accedez a des professionnels qualifies en soins de la peau, maquillage et esthetique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
            Prete pour votre consultation ?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Rejoignez une consultation video en quelques clics et beneficiez de conseils beaute personnalises.
          </p>
          <Link to="/join" className="btn-primary text-lg px-10 py-4 inline-block">
            Commencer maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
