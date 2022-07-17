import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const COUNT_ROOMS: number = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App countRooms={COUNT_ROOMS}/>
  </React.StrictMode>,
);
