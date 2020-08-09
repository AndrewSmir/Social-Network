import React from "react";
import styles from './Friends.module.css'

const Friends = (props) => {
    return (
        <div className={styles.friend}>
            <div>
                <img src={props.imgSrc} alt="logo"/>
            </div>
            <div>{props.name}</div>
        </div>

    )
}

export default Friends