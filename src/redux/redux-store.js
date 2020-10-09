import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import {appReducer} from "./app-reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducersButch = combineReducers({ //Склеиваем наши reducers в одну кучу
    dialogsPage: dialogsReducer,  //Название свойства - это компонента в _state. Значение - reducer, который отвечает за обработку этой страницы.
    profilePage: profileReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    authReducer, //можно сразу же использовать название reducer-a
    form: formReducer, //Для reducer-a redux-form свойство должно быть указано как form, т.к. в дальнейшем эта библиотека будет искать именно его
    appReducer
})

let store = createStore(reducersButch,  composeEnhancers(applyMiddleware(thunk)))

Window.prototype.store = store

//Создаем Store. getState, dispatch, callSubscriber - все это уже будет сидеть внутри store и будет его внутренними методами.
//Автоматически создается state, который будет включать в себя свойства, которые мы передаем в reducersButch.
/*
Т.е. сейчас мы сделали:
store = {
    state: {
        dialogsPage: ...,
        profilePage: ...
        и дальнейшее перечисление свойств объекта, который мы передаем в combineReducers
    },
    dispatch: {
    this.state.profilePage = profileReducer(this.state.profilePage, action);
    this.state.dialogsPage = dialogsReducer(this.state.dialogsPage, action);
    и д.р.....
    },
    getState(){...},
    callSubscriber(){...} и д.р.

}
Проблем в том, что наши свойства (dialogsPage, profilePage и т.д.) не имеют начальных значений. Поэтому начальное значение мы должны указать в соответсвющих Resucer-ax
(для dialogPage указываем значение state в dialogReducer и т.д.).
Что будет происходить? При вызове функции createStore наш Redux начинает отправлять всем reducer-am по порядку внутренние action-s.
Т.к. action.type, который отправляет Redux не будет найден, то reducer вернет значение state, который мы указываем в качестве initial state у каждого reducer-a.
Таким образом redux склеит наш общий state из кусочков initialState у каждого из reducer-oв.

Именно поэтому для каждой страницы мы должны создавать свой собственный reducer.

 */

export default store