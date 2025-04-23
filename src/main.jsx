import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" toastOptions={{
        style: {
          borderRadius: '8px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          style: {
            background: '#10B981',
            color: 'white',
          },
        },
        error: {
          style: {
            background: '#EF4444',
            color: 'white',
          },
        },
      }} />
    </BrowserRouter>
  </StrictMode>
); 