import React from "react";
import styles from './Nav.module.css'

function Nav(){
    return (<nav className={styles.nav}>
        <ul>
            <li className={styles.item}><a href="/profile">Profile</a></li>
            <li className={styles.item}><a href="/dialogs">Dialogs</a></li>
            <li className={styles.item}><a href="/news">News</a></li>
            <li className={styles.item}><a href="/music">Music</a></li>
            <li className={styles.item}><a href="/settings">Settings</a></li>
        </ul>
    </nav>)
}

export default Nav;

