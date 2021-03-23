import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App />
  /* <React.StrictMode>
    <App />
  </React.StrictMode> */,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/**
 * 计算根元素font size
 */
(function (doc: Document, win: Window) {
  const docEl: HTMLElement = doc.documentElement;
  const docBody: HTMLElement = doc.body;
  const resizeEvent: string = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const reCalc = () => {
    const clientWidth: number = docBody.clientWidth || docEl.clientWidth || docBody.scrollWidth || win.innerWidth || 375;
    const calcFontSize: number = (10 * (clientWidth / 375));
    docEl.style.fontSize = calcFontSize + 'px';
    docEl.style.opacity = '1';
  };
  reCalc();
  if (!document.addEventListener) return;
  win.addEventListener(resizeEvent, reCalc, false);
  doc.addEventListener('DOMContentLoaded', reCalc, false);
})(document, window);
