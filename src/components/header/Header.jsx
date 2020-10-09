import React from "react";
import styles from "./Header.module.css"
import {NavLink} from "react-router-dom";

function Header(props) {

    return (
        <header className={styles.header}>
            <img src={require('./img/logo.png')} alt="LOGO"/>
            <div className={styles.loginBlock}>
                {!props.auth.isAuth ? <NavLink to={'/login'}>Login</NavLink> : <div>
                    <p>{props.auth.login}</p>
                    <NavLink onClick={() => props.logout()}  className={styles.logout} to={'/login'}> Logout </NavLink>
                </div>
                }
            </div>
        </header>)
}

export default Header;