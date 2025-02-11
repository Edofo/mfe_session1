import React from 'react';
import { createRoot } from 'react-dom/client';
import Footer from './Footer';

const mount = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Container #root not found');
    return;
  }
  const root = createRoot(container);
  root.render(<Footer />);
};

mount(); // Toujours monter en mode standalone

export { mount }; // Export pour le shell