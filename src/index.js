import React from 'react';
// import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import skeleton from './components/skeleton';

import Footer from './components/footer'
import NavHeader from './components/nav-header'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="center">
            {NavHeader()}
            <App />
            {Footer()}
    </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
