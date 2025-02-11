import React, { Suspense } from 'react';

const Header = React.lazy(() => import('header/Header'));
const Footer = React.lazy(() => import('footer/Footer'));

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}  >
        <Suspense fallback={<div>Chargement du header...</div>}>
          <Header />
        </Suspense>

        <main style={{ padding: '2rem' }}>
          <h2>Bienvenue sur Efreiflix</h2>
          <p>Contenu principal de l'application...</p>
        </main>
      </div>

      <Suspense fallback={<div>Chargement du footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;