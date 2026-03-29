import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from '@livekit/components-react';
import '@livekit/components-styles';

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || 'wss://vision360-x3hyaivg.livekit.cloud';

function ConsultationRoom() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const expertName = decodeURIComponent(roomId);

  const [token, setToken] = useState(location.state?.token || null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If accessed directly (no token), show name prompt
  const [needsAuth, setNeedsAuth] = useState(!location.state?.token);

  const handleJoinDirect = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Veuillez entrer votre prénom.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identity: name.trim(),
          room: expertName,
          role: 'client',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la connexion');
      }

      const data = await response.json();
      setToken(data.token);
      setNeedsAuth(false);
    } catch (err) {
      setError(err.message || 'Impossible de rejoindre la consultation.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    navigate('/join');
  };

  // Direct access: ask for name
  if (needsAuth) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{expertName[0]}</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Consultation avec {expertName}
            </h2>
            <p className="text-gray-600 mt-1">
              Entrez votre prénom pour rejoindre la consultation vidéo.
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleJoinDirect} className="space-y-4">
              <div>
                <label htmlFor="directName" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Votre prénom
                </label>
                <input
                  id="directName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre prénom"
                  className="input-field"
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  `Rejoindre ${expertName}`
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            <button onClick={() => navigate('/join')} className="text-rose-500 hover:text-rose-600 underline">
              Choisir une autre experte
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Room Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">B</span>
          </div>
          <span className="text-white font-display font-semibold">BeautyCall</span>
          <span className="text-gray-400 text-sm">|</span>
          <span className="text-gray-300 text-sm">Consultation avec <strong>{expertName}</strong></span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex items-center gap-1.5 text-green-400 text-xs">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            En ligne
          </span>
        </div>
      </div>

      {/* LiveKit Video Conference */}
      <div className="flex-1 relative" data-lk-theme="default">
        <LiveKitRoom
          serverUrl={LIVEKIT_URL}
          token={token}
          connect={true}
          onDisconnected={handleDisconnect}
          style={{ height: '100%' }}
        >
          <VideoConference />
          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    </div>
  );
}

export default ConsultationRoom;
