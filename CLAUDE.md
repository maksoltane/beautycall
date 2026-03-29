# CLAUDE.md - Guide Developpeur BeautyCall

## Apercu du Projet

BeautyCall est une application de consultation video pour les professionnels de la beaute et de l'esthetique. Elle utilise LiveKit (WebRTC) pour les appels video en temps reel.

## Stack Technique

- **Frontend** : React 18 + Vite + TailwindCSS
- **Backend** : Node.js + Express
- **Video** : LiveKit (WebRTC) via `@livekit/components-react` et `livekit-client`
- **Tokens** : `livekit-server-sdk` cote serveur pour la generation de JWT
- **Routage** : React Router v6
- **Style** : TailwindCSS avec theme personnalise (rose, dore)

## Commandes Principales

```bash
# Installer les dependances
npm install

# Lancer en mode developpement (frontend + backend)
npm run dev

# Build de production
npm run build

# Lancer le serveur de production
npm start

# Lancer uniquement le backend
npm run server
```

## Architecture

### Frontend (src/)
- `main.jsx` : Point d'entree React avec BrowserRouter
- `App.jsx` : Routes principales (/, /join, /consultation/:roomId)
- `pages/HomePage.jsx` : Landing page avec hero, features, CTA
- `pages/JoinRoom.jsx` : Formulaire pour rejoindre/creer une salle
- `pages/ConsultationRoom.jsx` : Salle video LiveKit (composants VideoConference)
- `components/Header.jsx` : Barre de navigation (masquee en consultation)
- `components/Footer.jsx` : Pied de page (masque en consultation)

### Backend (server/)
- `server/index.js` : Serveur Express avec endpoint POST /api/token pour generer des jetons LiveKit

### Configuration
- `vite.config.js` : Proxy /api vers le backend (port 3001)
- `tailwind.config.js` : Theme personnalise avec couleurs rose et gold
- `.env` : Variables d'environnement (non versionne)

## Fichiers Importants

| Fichier | Role |
|---|---|
| `server/index.js` | API Express, generation de tokens LiveKit |
| `src/pages/ConsultationRoom.jsx` | Integration LiveKit, salle video |
| `src/pages/JoinRoom.jsx` | Logique de connexion, appel API token |
| `src/index.css` | Classes utilitaires personnalisees (btn-primary, card, etc.) |

## Conventions de Code

- Composants fonctionnels React avec hooks
- Fichiers JSX pour les composants React
- TailwindCSS pour le styling (pas de CSS modules)
- Classes utilitaires personnalisees definies dans `src/index.css` (@layer components)
- Nommage PascalCase pour les composants, camelCase pour les fonctions
- Textes de l'interface en francais

## Variables d'Environnement Requises

Creer un fichier `.env` a la racine avec :

```
LIVEKIT_API_KEY=votre_cle_api
LIVEKIT_API_SECRET=votre_secret_api
LIVEKIT_URL=wss://votre-projet.livekit.cloud
NEXT_PUBLIC_LIVEKIT_URL=wss://votre-projet.livekit.cloud
PORT=3001
```

Ne jamais commiter le fichier `.env` avec les vraies cles.

## Flux Utilisateur

1. L'utilisateur arrive sur la page d'accueil (/)
2. Il clique sur "Demarrer une consultation" et est redirige vers /join
3. Il entre son nom, un code de salle (ou en genere un), et choisit son role
4. Le frontend appelle POST /api/token avec ces informations
5. Le serveur genere un JWT LiveKit et le renvoie
6. L'utilisateur est redirige vers /consultation/:roomId avec le token
7. Le composant LiveKitRoom se connecte au serveur LiveKit avec le token
8. La consultation video demarre
