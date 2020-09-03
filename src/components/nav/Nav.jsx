import React from "react";
import styles from './Nav.module.css'
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

function Nav(props){

    return (<nav className={styles.nav}>
        <ul>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/profile">Profile</NavLink></li>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/dialogs">Dialogs</NavLink></li>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/news">News</NavLink></li>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/music">Music</NavLink></li>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/settings">Settings</NavLink></li>
        </ul>
        <div className={styles.friends}>
            <p>Friends</p>

        </div>

    </nav>)
}

export default Nav;

