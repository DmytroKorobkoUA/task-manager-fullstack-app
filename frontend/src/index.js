import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;

        navigator.serviceWorker
            .register(swUrl)
            .then((registration) => {
                console.log('Service Worker registered with scope: ', registration.scope);
            })
            .catch((error) => {
                console.error('Error registering Service Worker: ', error);
            });
    });
}
