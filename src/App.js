import React from 'react';
import './App.css'
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Profile from "./components/profile/Profile";
import Music from "./components/music/Music";
import Settings from "./components/settings/Settings";
import News from "./components/news/News";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/dialogs/DialogsContainer";

function App(props) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Nav state={props.state.sidebar}/>
                <div className="app-wrapper-content">
                    <Route path='/profile' render={() => <Profile store={props.store}/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer store={props.store}/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );

}

export default App;
