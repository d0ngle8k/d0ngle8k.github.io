import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import emailjs from 'emailjs-com';

// Add error handling
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

console.log('Starting application...');

try {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  );
  console.log('Application rendered successfully');
} catch (error) {
  console.error('Failed to render application:', error);
}
