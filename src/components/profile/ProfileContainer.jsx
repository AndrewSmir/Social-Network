import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileStatusTC, setProfileTC, updateProfileStatusTC} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends Component { //Задача контейнерной компоненты - быть оберткой для презентационной компоненты.

    componentDidMount() { //Делаем ajax запросы в методе componentDidMount, т.к. получаение данных - асинхронный процесс. Если будем делать запрос на сервер до того, как наша компонента будет вмонтирована, то есть риск, что мы не сможем ничего отрисовать, например, из-зи проблем с сетью
        let userId = this.props.match.params.userId; //props.match.params.userId - эти пропсы нам добавляет HOC withRouter

        if (!userId){
            userId = this.props.authorizedUserId;
        }

        this.props.setProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {

        return(
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        profileStatus: state.profilePage.profileStatus,
        authorizedUserId: state.authReducer.id,
        isAuth: state.authReducer.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (userId) => {
            dispatch(setProfileTC(userId))
        },
        getUserStatus: (userId) => {
            dispatch(getProfileStatusTC(userId))
        },
        updateUserStatus: status => {
            dispatch(updateProfileStatusTC(status))
        }
    }
}

// withRouter(ProfileContainer); вернет нам новую компоненту, в props которой добавятся объекты
// match, location, history, staticContext

/*
location:
    hash: ""
    key: "sxa9ph"
    pathname: "/profile/11722"
    search: ""
    state: null

match: - показывает совпадение url с какими-либо Route path. В нашем случае было найдено совпадение с <Route path='/profile'
    isExact: false (или true) - совпал ли адрес в url строке точно. Т.к. наш path - "/profile/11722", то значение false
    params: {11722} - сюда нам приходят параметры, которые указаны у Route path='/profile/: после двоеточия
    path: "/profile"
    url: "/profile"
 */

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect)
(ProfileContainer)
