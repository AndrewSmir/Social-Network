import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {

    const mapStateToProps = (state) => {
        return {
            isAuth: state.authReducer.isAuth
        }
    }

    class RedirectComponent extends React.Component { //Создаем классовый (можно функциональный компонент, который нам вернет HOC
        render() {
            if (!this.props.isAuth) {
                return <Redirect to={'/login'}/> //В зависимости от props вернем либо редирект
            }
            return <Component {...this.props}/> //либо компонент, который мы передаем в качестве аргумента для HOC.
        }
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToProps, {})(RedirectComponent) //Оборачиваем RedirectComponent connect-om для доступа к props из state

    return ConnectedAuthRedirectComponent
}
