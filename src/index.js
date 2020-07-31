import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { render } from '@testing-library/react';


var model = {
  counter: -1
}
function renderView() {
  ReactDOM.render(
    <React.StrictMode>
      <App counter={model.counter} onClick={() => {model.counter += 1; renderView();}}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderView();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
