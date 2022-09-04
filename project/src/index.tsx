import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/offers-process/offers-async-action';
import { checkAuthAction } from './store/user-process/user-async-action';
import { BrowserRouter } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
