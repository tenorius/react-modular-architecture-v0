import 'react-app-polyfill/ie11';
import './assets/js/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Provider from 'react-redux/es/components/Provider';
import WebFont from 'webfontloader';
import customHistory from './modules/common/services/history';
import App from './modules/common/index';
import * as serviceWorker from './serviceWorker';
import store from './store';


console.log('process env:', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'react-app:*');
}

WebFont.load({
  google: {
    families: ['Material Icons'],
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#66BB6A',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4d79ff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
