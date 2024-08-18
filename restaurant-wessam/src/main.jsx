import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './Components/tools/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartProvider>
    <GoogleOAuthProvider>
                  <App />
    </GoogleOAuthProvider>
    </CartProvider>
  </React.StrictMode>
);
