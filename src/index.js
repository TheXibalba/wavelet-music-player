import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const innerWidth=window.innerWidth;
let device=true;
if(innerWidth<=768){
device=false;
}

ReactDOM.render(
  <React.StrictMode>
    <App device={device} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

