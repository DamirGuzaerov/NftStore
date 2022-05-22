import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {mainStore} from "./stores/mainStore";
import {MoralisProvider} from 'react-moralis';
import {ModalConstructor} from "./components/modals/modalConstructor/modalConstructor";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={mainStore()}>
            <BrowserRouter>
                <MoralisProvider serverUrl='https://g12o0xvp31x1.usemoralis.com:2053/server'
                                 appId="m9ztPgLe96c2w3H2ntZSg7tyiVXlUVuf0lPb8eua">
                    <App/>
                    <ModalConstructor/>
                </MoralisProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

