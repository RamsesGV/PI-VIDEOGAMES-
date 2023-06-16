

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'
import { Provider } from 'react-redux'

document.cookie = "postpagebeta=1; SameSite=None; Secure";
document.cookie = "_ga=GA1.2.123456789.123456789; SameSite=None; Secure";
document.cookie = "is_emerald=true; SameSite=None; Secure";
document.cookie = "is_authed=1; SameSite=None; Secure";
document.cookie = "m_section=home; SameSite=None; Secure";
document.cookie = "frontpagebetav2=1; SameSite=None; Secure";
document.cookie = "pp=1; SameSite=None; Secure";
document.cookie = "__gads=ID=123456789; SameSite=None; Secure";
document.cookie = "__gpi=123456789; SameSite=None; Secure";
document.cookie = "m_window=1; SameSite=None; Secure";
document.cookie = "IMGURUIDJAFO=abcdefg; SameSite=None; Secure";
document.cookie = "SESSIONDATA=123456789; SameSite=None; Secure";
document.cookie = "m_sort=popularity; SameSite=None; Secure";
document.cookie = "_gid=GA1.2.987654321.987654321; SameSite=None; Secure";
document.cookie = "amplitude_id_f1fc2abcb6d136bd4ef338e7fc0b9d05imgur.com=eyJkZXZpY2VJZCI6IjEyMzQ1Njc4OTAiLCJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWRVc2VySWQiOiIxMjM0NTY3ODkwIiwidXNlclR5cGUiOiJhbm9ueW1vdXMiLCJhcHBsaWNhdGlvbklkIjoiODhjMTY1ODItNTQzOC00ZDkzLThkOGMtYTQ1NjA2MjllMDY1IiwiZXZlbnRJZCI6IjI0NzQyNzMzIn0=; SameSite=None; Secure";
document.cookie = "__qca=123456789; SameSite=None; Secure";

ReactDOM.render(
  <Provider store={store}> 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
