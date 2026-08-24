import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
