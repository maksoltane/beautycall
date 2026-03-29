# BeautyCall - Application de Consultation Visio

BeautyCall est une application de consultation video dediee aux professionnels de la beaute et de l'esthetique. Elle permet aux clients de se connecter en direct avec des experts pour des conseils personnalises en soins de la peau, maquillage et bien-etre.

## Stack Technique

- **Frontend** : React 18, Vite, TailwindCSS
- **Backend** : Node.js, Express
- **Video/WebRTC** : LiveKit (livekit-client, @livekit/components-react)
- **Routage** : React Router v6

## Fonctionnalites

- Consultations video en direct (HD, WebRTC via LiveKit)
- Chat integre pendant la consultation
- Controles audio/video (micro, camera)
- Systeme de salles avec codes de partage
- Roles distincts : client(e) et consultant(e)
- Interface elegante avec theme beaute (rose, dore)
- Design responsive (mobile, tablette, desktop)

## Prerequis

- Node.js >= 18
- npm >= 9
- Un compte LiveKit avec cles API (https://livekit.io)

## Installation

```bash
git clone <url-du-repo>
cd beautycall
npm install
```

## Configuration

Copiez le fichier `.env.example` en `.env` et renseignez vos cles :

```bash
cp .env.example .env
```

Variables requises :

| Variable | Description |
|---|---|
| `LIVEKIT_API_KEY` | Cle API LiveKit |
| `LIVEKIT_API_SECRET` | Secret API LiveKit |
| `LIVEKIT_URL` | URL WebSocket du serveur LiveKit |
| `NEXT_PUBLIC_LIVEKIT_URL` | URL LiveKit pour le client |
| `PORT` | Port du serveur Express (defaut : 3001) |

## Lancement

### Mode developpement

Lance le frontend Vite (port 5173) et le backend Express (port 3001) simultanement :

```bash
npm run dev
```

Ouvrir http://localhost:5173 dans le navigateur.

### Build de production

```bash
npm run build
npm start
```

Le serveur Express servira le build statique sur le port configure.

## Structure du Projet

```
beautycall/
├── index.html              # Point d'entree HTML (Vite)
├── package.json
├── vite.config.js          # Configuration Vite + proxy API
├── tailwind.config.js      # Configuration TailwindCSS
├── postcss.config.js
├── .env                    # Variables d'environnement (non versionne)
├── .env.example            # Modele de variables d'environnement
├── server/
│   └── index.js            # Serveur Express (API tokens LiveKit)
└── src/
    ├── main.jsx            # Point d'entree React
    ├── App.jsx             # Routage principal
    ├── index.css           # Styles Tailwind + theme personnalise
    ├── components/
    │   ├── Header.jsx      # En-tete avec navigation
    │   └── Footer.jsx      # Pied de page
    └── pages/
        ├── HomePage.jsx         # Page d'accueil
        ├── JoinRoom.jsx         # Formulaire de connexion a une salle
        └── ConsultationRoom.jsx # Salle de consultation video
```

## Endpoints API

### POST /api/token

Genere un jeton d'acces LiveKit.

**Corps de la requete :**

```json
{
  "identity": "Nom de l'utilisateur",
  "room": "CODE_SALLE",
  "role": "client"
}
```

**Reponse :**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### GET /api/health

Verifie l'etat du serveur.

**Reponse :**

```json
{
  "status": "ok",
  "timestamp": "2026-03-29T12:00:00.000Z"
}
```

## Licence

Projet prive - Tous droits reserves.
