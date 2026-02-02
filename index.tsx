
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Target container 'root' not found.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React Rendering Error:", err);
  }
};

// Ensure DOM is fully ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
