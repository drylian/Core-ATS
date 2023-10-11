import React from 'react';
import { createRoot } from 'react-dom/client';
import '/index.css';
import 'boxicons/css/boxicons.min.css'
import App from './scripts/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);