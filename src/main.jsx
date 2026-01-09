import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JS (optional, for components that require JS like modals/dropdowns)
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);