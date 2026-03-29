import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXPERTS } from '../constants/experts';

function JoinRoom() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Veuillez entrer votre nom.');
      return;
    }

    if (!selectedExpert) {
      setError('Veuillez choisir une experte.');
      return;
    }

    setLoading(true);

    try {
      const room = selectedExpert.name;
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identity: name.trim(),
          room,
          role: 'client',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la connexion');
      }

      const { token } = await response.json();

      navigate(`/consultation/${encodeURIComponent(room)}`, {
        state: { token, identity: name.trim(), role: 'client', expert: room },
      });
    } catch (err) {
      setError(err.message || 'Impossible de rejoindre la consultation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Choisissez votre experte
          </h1>
          <p className="text-gray-600">
            Sélectionnez une experte beauté pour démarrer votre consultation vidéo.
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Votre prénom
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrez votre prénom"
                className="input-field"
                autoFocus
              />
            </div>

            {/* Expert Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Votre experte
              </label>
              <div className="space-y-2">
                {EXPERTS.map((expert) => (
                  <button
                    key={expert.name}
                    type="button"
                    onClick={() => setSelectedExpert(expert)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all text-left ${
                      selectedExpert?.name === expert.name
                        ? 'border-rose-400 bg-rose-50 shadow-md'
                        : 'border-gray-200 hover:border-rose-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${expert.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-lg">{expert.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900">{expert.name}</div>
                      <div className="text-xs text-gray-500">{expert.specialty}</div>
                    </div>
                    {selectedExpert?.name === expert.name && (
                      <svg className="w-5 h-5 text-rose-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !selectedExpert}
              className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion en cours...
                </span>
              ) : selectedExpert ? (
                `Consulter ${selectedExpert.name}`
              ) : (
                'Choisissez une experte'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Vous pouvez aussi accéder directement à une consultation via<br />
          <span className="font-mono text-rose-500">beautycall.com/consultation/NomExperte</span>
        </p>
      </div>
    </div>
  );
}

export default JoinRoom;
