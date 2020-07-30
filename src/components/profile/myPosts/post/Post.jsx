import React from "react";
import styles from "./Post.module.css"

function Post(props) {
    return (
        <div className={styles.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsLfGk8cfZYn-FlJfh4I9rPP656klMZAF6Og&usqp=CAU"
                alt="avatar"/>
            <span>{props.message}</span>
            <div>
                <span>Like - {props.like}</span>
            </div>
        </div>
    )
}

export default Post