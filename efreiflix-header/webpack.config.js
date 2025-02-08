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

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3001, // Port différent du Shell pour le développement standalone
    hot: true,  // Support du Hot Module Replacement
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"], // Support de la syntaxe JSX
        },
      },
    ],
  },
  plugins: [
    // Configuration Module Federation pour exposer le Header
    new ModuleFederationPlugin({
      name: "header", // Nom unique du micro-frontend
      filename: "remoteEntry.js", // Point d'entrée pour Module Federation
      exposes: {
        // Expose le composant Header pour l'application Shell
        // Le chemin './Header' sera utilisé dans l'import côté Shell
        "./Header": "./src/components/Header",
      },
      shared: {
        // Configuration du partage des dépendances
        react: { 
          singleton: true,      // Une seule instance de React
          requiredVersion: false, // Flexibilité sur les versions
          eager: false         // Chargement asynchrone pour le remote
        },
        "react-dom": { 
          singleton: true,
          requiredVersion: false,
          eager: false
        }
      },
    }),
    // Support du développement standalone
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
}; 