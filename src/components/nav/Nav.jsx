import React from "react";
import styles from './Nav.module.css'
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

function Nav(props){

    return (<nav className={styles.nav}>
        <ul>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/profile">Profile</NavLink></li>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/dialogs">Dialogs</NavLink></li>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/users">Users</NavLink></li>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/news">News</NavLink></li>
            <li className={styles.item}><NavLink activeClassName={styles.activeLink} to="/settings">Settings</NavLink></li>
        </ul>
    </nav>)
}

//Navlink - встроенная в react компонента. Изменяет url в браузере на значение, которое мы указываем в to={то, на что изменится текст в строке браузера}
//При компиляции Navlink меняется на тег <a> (ссылка), но при этом у нее отключено дефолтное поведение по редиректу на другую страницу. Остается лишь изменение строки в браузере без перехода.
//Navlink не меняет содержимое страницы. Navlink отвечает только за изменение текста в строке браузера.
//За изменение содержимого страницы будет следить другая компонента - Route.

export default Nav;

