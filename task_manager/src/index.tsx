import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from "./redux/store"
import { Provider } from "react-redux";
// import {ApiProvider} from "@reduxjs/toolkit/query/react";
// import { createdApi } from './redux/api';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ApiProvider api = {createdApi}> */}
        <ToastContainer />
        <App />
        {/* </ApiProvider> */}
      </PersistGate>

    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
