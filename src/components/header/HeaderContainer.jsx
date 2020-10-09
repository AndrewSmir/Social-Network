import React, {Component} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/auth-reducer";


class HeaderContainer extends Component { //Контейнерная компонента дает логику презентационной компоненте

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        logout: () => {
            dispatch(logoutTC())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)