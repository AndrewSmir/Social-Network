import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux/redux-store";


const reRenderDOM = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} store={store}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

reRenderDOM(store.getState())

store.subscribe(() => {
    reRenderDOM(store.getState())
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
