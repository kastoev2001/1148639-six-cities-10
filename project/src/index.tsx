import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { offers } from './mocks/offers';
import { Provider } from 'react-redux';
import { store } from './store';

const COUNT_ROOMS = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
		<Provider store={store}>
    <App countRooms={COUNT_ROOMS} offers={offers}/>
		</Provider>
  </React.StrictMode>,
);
