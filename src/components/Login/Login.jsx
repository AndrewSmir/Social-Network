import React from "react";
import LoginForm from "./LoginForm";
import {signInTC} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.signIn(formData)
    }

    if (props.isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn(loginData) {
            dispatch(signInTC(loginData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

