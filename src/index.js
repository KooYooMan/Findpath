import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import axios from 'axios';
// axios.post('http://secustom.herokuapp.com/path', {
//   exam: [
//     2, 17, 16, 18, 14, 7, 15, 19, 
//     13, 14, 13, 14, 15, 16, 17, 18, 
//     8, 13, 12, 3, 10, 19, 18, 19, 
//     4, 12, 11, 10, 9, 10, 11, 20, 
//     9, 17, 13, 15, 8, 10, 12, 19,
//     14, 8, 9, 6, 7, 6, 13, 16,      
//     5, 3, 4, 5, 8, 14, 14, 17,
//     1, 2, 7, 3, 12, 19, 15, 16
// ],
// })
// .then(() => {})
// .catch(() => {console.log('error')});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
