import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {MainApp} from './App';


ReactDOM.render(
    <React.StrictMode>
        <MainApp/>
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
