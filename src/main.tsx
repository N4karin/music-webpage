import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure this is correct
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/globals.css'; // Import Tailwind CSS

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
