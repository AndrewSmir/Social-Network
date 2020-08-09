import React from "react";
import styles from "./Header.module.css"

function Header() {
    return (
    <header className={styles.header}>
        <img src={require('./img/logo.png')} alt="LOGO"/>
    </header>)
}

export default Header;