import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {mainStore} from "./stores/mainStore";
import { MoralisProvider } from 'react-moralis';
import Moralis from "moralis";
import {ModalConstructor} from "./components/modals/modalConstructor/modalConstructor";
Moralis.start({ serverUrl : "https://qtqaadqffvcu.usemoralis.com:2053/server", appId : "BJvgEwWE7NL0YrDFR6LE77K56awsaJQQ9IrnTqMt" });

ReactDOM.render(
  <React.StrictMode>
      <MoralisProvider serverUrl='https://qtqaadqffvcu.usemoralis.com:2053/server' appId="BJvgEwWE7NL0YrDFR6LE77K56awsaJQQ9IrnTqMt">
      <Provider store={mainStore()}>
          <BrowserRouter>
              <App />
              <ModalConstructor/>
          </BrowserRouter>
      </Provider>
      </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
