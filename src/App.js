import React from 'react';
import './App.css'
import Nav from "./components/nav/Nav";
import Settings from "./components/settings/Settings";
import News from "./components/news/News";
import {BrowserRouter, HashRouter, Route} from "react-router-dom"; //Используем browserRouter
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

//import DialogsContainer from "./components/dialogs/DialogsContainer";
//import ProfileContainer from "./components/profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer')) //React.lazy - позволяет нам загружать страницы не сразу, а только по мере обращения к ним
const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer')) //Компоненту, которую мы "лениво" загружаем нужно обернуть в <React.Suspense fallback={<div>Loading...</div>}>
    //В fallback мы пишем компоненту (иили просто какой-либо текст или div или страницу), которая будет показываться, пока идет загрузка компоненты
    //Можно обернуть сразу несколько компонент

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp() //Делаем инициализацию приложения, чтобы все нужные пропсы пришли до отрисовки приложения
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader className='full'/>
        } else {
            return (
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Nav/>
                    <div className="app-wrapper-content">
                        <React.Suspense fallback={<Preloader/>}>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='/login' render={() => <LoginPage/>}/>
                        </React.Suspense>
                    </div>
                </div>
            );
        }
    }
}

//Компонента Route - встроенная react компонента. Она следит за изменением url и, если url изменился, то отображает компоненту, которую мы указываем в render
//Как именно меняется браузерная строка для Route не важно. Важно лишь то, что она изменилась. Если Адресная строка изменилась и больше не соответствует значению render,
//то route уничтожает информацию, которую мы отображали ранее

const mapStateToProps = (state) => {
    return {
        initialized: state.appReducer.initialized
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initializeApp: () => {
            dispatch(initializeAppTC())
        }
    }
}

let ComposedApp = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(App)

export const MainApp = (props) => {
    return (
        <HashRouter>
            <Provider store={store}>
                <ComposedApp/>
            </Provider>
        </HashRouter>)
}
