import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import HomePage from './pages/home';
import NotFoundPage from './pages/notFound';
import { CssBaseline } from '@mui/material';

/*

- help
 - wenn das geöffnete dokument gelöscht wird, wird automatisch ein neues angelegt. deswegen ist unten ein dokument ohne titel

- umlaute in csv
- pdf seitenzahlen
- localstorage init

*/

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#fb0010',
      dark: '#991111',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ffc917',
      dark: '#0f0',
      contrastText: '#fff',
    },
    mode: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
