import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/home';
import NotFoundPage from './pages/notFound';

ReactDOM.render(
  <React.StrictMode>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route element={<NotFoundPage />} />
    </Routes>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
