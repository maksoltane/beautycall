import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  VideoTrack,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';
import { generateToken } from '../utils/token';
import { EXPERTS } from '../constants/experts';

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || 'wss://vision360-x3hyaivg.livekit.cloud';

function FaceTimeLayout({ expertNom, onDisconnect }) {
  const localParticipant = useLocalParticipant();

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  const remoteTracks = tracks.filter(
    (t) => t.participant.sid !== localParticipant.localParticipant.sid && t.source === Track.Source.Camera
  );
  const localTrack = tracks.find(
    (t) => t.participant.sid === localParticipant.localParticipant.sid && t.source === Track.Source.Camera
  );

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const toggleMic = () => {
    localParticipant.localParticipant.setMicrophoneEnabled(!micOn);
    setMicOn(!micOn);
  };

  const toggleCam = () => {
    localParticipant.localParticipant.setCameraEnabled(!camOn);
    setCamOn(!camOn);
  };

  return (
    <div className="h-full flex flex-col bg-black relative">
      {/* Vidéo distante en plein écran */}
      <div className="flex-1 relative">
        {remoteTracks.length > 0 && remoteTracks[0].publication ? (
          <VideoTrack
            trackRef={remoteTracks[0]}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold">{expertNom[0]}</span>
            </div>
            <p className="text-lg font-medium">{expertNom}</p>
            <p className="text-gray-400 text-sm mt-1">En attente de connexion...</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs">Vous êtes connecté(e)</span>
            </div>
          </div>
        )}
      </div>

      {/* Vignette locale (style FaceTime - PiP) */}
      {localTrack && localTrack.publication && (
        <div className="absolute top-4 right-4 w-32 h-44 sm:w-40 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 z-10">
          <VideoTrack
            trackRef={localTrack}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
          />
        </div>
      )}

      {/* Barre de contrôles style FaceTime */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl rounded-full px-6 py-3">
          {/* Micro */}
          <button
            onClick={toggleMic}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              micOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {micOn ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v1a7 7 0 01-14 0v-1m7 4v4m-4 0h8m-4-16a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          {/* Caméra */}
          <button
            onClick={toggleCam}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              camOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {camOn ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 015.636 5.636" />
              </svg>
            )}
          </button>

          {/* Raccrocher */}
          <button
            onClick={onDisconnect}
            className="w-14 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsultationRoom() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const expert = EXPERTS.find((e) => e.page === roomId);
  const expertNom = expert?.nom || roomId;

  const [token, setToken] = useState(location.state?.token || null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      const jwt = await generateToken(name.trim(), expertNom);
      setToken(jwt);
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

  if (needsAuth) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{expertNom[0]}</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Consultation avec {expertNom}
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
                  `Rejoindre ${expertNom}`
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
    <div className="h-screen bg-black flex flex-col">
      <LiveKitRoom
        serverUrl={LIVEKIT_URL}
        token={token}
        connect={true}
        audio={true}
        video={true}
        onDisconnected={handleDisconnect}
        style={{ height: '100%' }}
      >
        <FaceTimeLayout expertNom={expertNom} onDisconnect={handleDisconnect} />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}

export default ConsultationRoom;
