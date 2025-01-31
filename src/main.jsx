import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider
import store from './redux/store';        // Import your store
import App from './App.jsx';
import './index.css';

// Create a root for the React app
const root = createRoot(document.getElementById('root'));

// Render the app wrapped with Provider
root.render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap your App with Provider */}
      <App />
    </Provider>
  </StrictMode>,
);
