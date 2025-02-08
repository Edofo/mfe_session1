# EFREIFlix - Démo Micro-Frontends avec Webpack Module Federation

Ce projet est un exemple minimaliste de mise en œuvre des micro-frontends utilisant Webpack Module Federation et React. Il se compose de deux applications :
- Une application "Shell" (hôte)
- Un micro-frontend "Header" (remote)

## Structure du Projet

```
efreiflix/
├── efreiflix-header/          # Micro-frontend Header
│   ├── public/
│   │   └── index.html        # Template HTML pour le développement standalone
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.js     # Composant Header
│   │   ├── bootstrap.js      # Initialisation de l'application
│   │   └── index.js          # Point d'entrée
│   ├── package.json          # Dépendances
│   └── webpack.config.js      # Configuration Webpack + Module Federation
│
└── efreiflix-shell/          # Application Shell (hôte)
    ├── public/
    │   └── index.html        # Template HTML
    ├── src/
    │   ├── App.js            # Composant principal avec import du Header
    │   ├── bootstrap.js      # Initialisation de l'application
    │   └── index.js          # Point d'entrée
    ├── package.json          # Dépendances
    └── webpack.config.js      # Configuration Webpack + Module Federation
```

## Explication Détaillée

### 1. Micro-Frontend Header (`efreiflix-header`)

#### 📄 webpack.config.js
\`\`\`javascript
new ModuleFederationPlugin({
  name: "header",
  filename: "remoteEntry.js",
  exposes: {
    "./Header": "./src/components/Header"
  },
  shared: {
    react: { 
      singleton: true, 
      requiredVersion: false,
      eager: false
    },
    "react-dom": { 
      singleton: true,
      requiredVersion: false,
      eager: false
    }
  }
})
\`\`\`
Points clés :
- `name: "header"` : Identifiant unique du micro-frontend
- `filename: "remoteEntry.js"` : Point d'entrée pour Module Federation
- `exposes` : Déclare quels composants sont accessibles aux autres applications
- `shared` : Configuration avancée du partage des dépendances
  - `singleton: true` : Une seule instance de React
  - `requiredVersion: false` : Désactive la vérification stricte des versions
  - `eager: false` : Chargement asynchrone des dépendances

#### 📄 src/bootstrap.js
\`\`\`javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Header />);
\`\`\`
- Initialisation de l'application Header
- Séparé du point d'entrée pour le chargement asynchrone

#### 📄 src/index.js
\`\`\`javascript
import('./bootstrap');
\`\`\`
- Point d'entrée minimal
- Import asynchrone du bootstrap

### 2. Application Shell (`efreiflix-shell`)

#### 📄 webpack.config.js
\`\`\`javascript
new ModuleFederationPlugin({
  name: "shell",
  remotes: {
    header: "header@http://localhost:3001/remoteEntry.js"
  },
  shared: {
    react: { 
      singleton: true,
      requiredVersion: false,
      eager: true
    },
    "react-dom": { 
      singleton: true,
      requiredVersion: false,
      eager: true
    }
  }
})
\`\`\`
Points clés :
- `name: "shell"` : Identifiant de l'application hôte
- `remotes` : Déclare les micro-frontends à importer
- `shared` : Configuration avancée similaire au Header
  - `eager: true` : Chargement immédiat des dépendances dans le Shell

#### 📄 src/bootstrap.js
\`\`\`javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
\`\`\`
- Initialisation de l'application Shell
- Séparé du point d'entrée pour le chargement asynchrone

#### 📄 src/App.js
\`\`\`javascript
const Header = React.lazy(() => import('header/Header'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Chargement du header...</div>}>
        <Header />
      </Suspense>
      <main style={{ padding: '2rem' }}>
        <h2>Bienvenue sur Efreiflix</h2>
        <p>Contenu principal de l'application...</p>
      </main>
    </div>
  );
};
\`\`\`

## Comment ça marche ?

1. **Initialisation Asynchrone**
   - Les deux applications utilisent un système de bootstrap séparé
   - Le point d'entrée (`index.js`) charge de manière asynchrone le bootstrap
   - Cette approche évite les problèmes de chargement des modules partagés

2. **Gestion des Dépendances Partagées**
   - Le Shell charge React de manière eagère (`eager: true`)
   - Le Header charge React de manière asynchrone (`eager: false`)
   - Les versions sont flexibles (`requiredVersion: false`)
   - Une seule instance de React est garantie (`singleton: true`)

3. **Chargement Dynamique**
   - Le Header est chargé de manière lazy dans le Shell
   - Un fallback est affiché pendant le chargement
   - Le composant n'est chargé que lorsqu'il est nécessaire

## Installation et Démarrage

1. Dans le dossier `efreiflix-header` :
```bash
npm install
npm start
```

2. Dans le dossier `efreiflix-shell` :
```bash
npm install
npm start
```

3. Accéder aux applications :
- Shell : http://localhost:3000
- Header (standalone) : http://localhost:3001

## Points Clés à Retenir

1. **Initialisation Asynchrone** est cruciale pour Module Federation
2. **Configuration des Modules Partagés** doit être soigneusement gérée
3. **Chargement Dynamique** améliore les performances
4. **Développement Indépendant** est possible grâce au mode standalone
5. **Architecture Simple** mais extensible

## Pour Aller Plus Loin

- Ajouter d'autres micro-frontends
- Implémenter un système de routing
- Ajouter des tests
- Mettre en place un système de déploiement
- Gérer la communication entre micro-frontends
