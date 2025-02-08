/**
 * Composant Header - Micro-frontend
 * 
 * Ce composant est exposé via Module Federation et sera importé
 * dynamiquement par l'application Shell. Il peut être :
 * 1. Utilisé de manière standalone (développement)
 * 2. Intégré dans l'application Shell (production)
 * 
 * Le style est volontairement simple pour la démonstration.
 */

import React from 'react';

const Header = () => {
  // Styles inline pour éviter les dépendances CSS
  // Dans un vrai projet, considérer CSS Modules ou Styled Components
  return (
    <header style={{ 
      padding: '1rem', 
      backgroundColor: '#1a1a1a',
      color: 'white'
    }}>
      <h1>Efreiflix</h1>
    </header>
  );
};

// Export par défaut pour faciliter l'import dans le Shell
export default Header; 