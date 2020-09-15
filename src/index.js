import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

/*
store.subscribe(() => {
    reRenderDOM()
}) - с введением connect стало неактуально

 */

/*
<Provider store={store}>
   <App/>
</Provider> // - Оборачиваем компоненту Provider-om, таким образом то, что мы передаем в провайдер (store={store}) будет доступно для всех дочерних компонент.
 */


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
