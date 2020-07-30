import React from "react";
import styles from './Nav.module.css'

function Nav(){
    return (<nav className={styles.nav}>
        <ul>
            <li className={styles.item}><a href="#">Profile</a></li>
            <li className={styles.item}><a href="#">Messages</a></li>
            <li className={styles.item}><a href="#">News</a></li>
            <li className={styles.item}><a href="#">Music</a></li>
            <li className={styles.item}><a href="#">Settings</a></li>
        </ul>
    </nav>)
}

export default Nav;

