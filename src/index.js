import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

Pusher.logToConsole = true;
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    forceTLS: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);