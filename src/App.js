import React from 'react';
import './App.css'
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";
import News from "./components/news/News";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

function App(props) {
    return (
            <div className="app-wrapper">
                <Header/>
                <Nav/>
                <div className="app-wrapper-content">
                    <Route path='/profile' render={() => <Profile />}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
    );

}

//Компонента Route - встроенная react компонента. Она следит за изменением url и, если url изменился, то отображает компоненту, которую мы указываем в render
//Как именно меняется браузерная строка для Route не важно. Важно лишь то, что она изменилась. Если Адресная строка изменилась и больше не соответствует значению render,
//то route уничтожает информацию, которую мы отображали ранее

export default App;
