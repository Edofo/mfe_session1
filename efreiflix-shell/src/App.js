/**
 * Composant principal de l'application Shell
 * 
 * Ce composant est responsable de :
 * 1. L'importation dynamique du micro-frontend Header
 * 2. La gestion du chargement asynchrone avec Suspense
 * 3. L'affichage du contenu principal de l'application
 * 
 * L'utilisation de React.lazy et Suspense permet un chargement optimisé
 * où le Header n'est chargé que lorsqu'il est nécessaire.
 */

import React, { Suspense } from 'react';

// Import dynamique du Header via Module Federation
// La syntaxe 'header/Header' correspond à la configuration dans webpack.config.js
// - 'header' est le nom défini dans remotes
// - '/Header' est le chemin exposé dans le micro-frontend
const Header = React.lazy(() => import('header/Header'));

const App = () => {
  return (
    <div>
      {/* 
        Suspense wrapper pour le chargement asynchrone
        Le fallback est affiché pendant le chargement du Header
      */}
      <Suspense fallback={<div>Chargement du header...</div>}>
        <Header />
      </Suspense>

      {/* Contenu principal de l'application */}
      <main style={{ padding: '2rem' }}>
        <h2>Bienvenue sur Efreiflix</h2>
        <p>Contenu principal de l'application...</p>
      </main>
    </div>
  );
};

export default App; 