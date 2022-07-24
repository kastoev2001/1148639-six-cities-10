import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { offers } from './mocks/offers';

const COUNT_ROOMS = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App countRooms={COUNT_ROOMS} offers={offers}/>
  </React.StrictMode>,
);
