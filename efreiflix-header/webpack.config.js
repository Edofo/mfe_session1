/**
 * Configuration Webpack pour le micro-frontend Header
 * 
 * Ce fichier configure un micro-frontend qui sera consommé par l'application Shell.
 * Il expose un composant Header qui pourra être importé dynamiquement.
 * 
 * Points clés :
 * - Exposition du composant via Module Federation
 * - Configuration du port de développement standalone
 * - Gestion des dépendances partagées avec le Shell
 * - Support du développement indépendant
 */

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const { dependencies } = require('./package.json');

module.exports = {
  entry: './src/index',  // Point d'entrée principal de l'application
  output: {
    filename: '[name].bundle.js', // Nom du fichier de sortie (généré dynamiquement)
    path: path.resolve(__dirname, 'dist'), // Dossier de sortie (dist)
    publicPath: 'http://localhost:3001/', // URL publique de base pour les assets (IMPORTANT pour Module Federation)
  },
  devServer: {
    port: 3001, // Port du serveur de développement (IMPORTANT : doit être unique pour chaque MFE)
    static: {
      directory: path.join(__dirname, 'public'),
    },
    headers: { // Configuration des en-têtes CORS (Cross-Origin Resource Sharing)
      'Access-Control-Allow-Origin': '*', // Autoriser toutes les origines (pour le développement)
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      // ... (règles pour les loaders - OK)
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'header', // Nom UNIQUE du Micro Frontend (utilisé par le Shell pour l'importer)
      filename: 'remoteEntry.js', // Nom du fichier d'entrée exposé (conventionnel)
      exposes: {
        './Header': './src/Header', // Expose le composant Header (chemin relatif)
      },
      shared: { // Configuration des dépendances partagées
        ...dependencies, // Partage toutes les dépendances listées, en s'assurant qu'il y a une seule version pour chaque MFE.
        react: { singleton: true, requiredVersion: dependencies.react }, // Partage React (IMPORTANT : une seule instance de React)
        'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] }, // Partage ReactDOM (IMPORTANT : une seule instance de ReactDOM)
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};