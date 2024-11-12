import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure this is correct
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/globals.css'; // Import Tailwind CSS
import { ThemeProvider } from './components/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
