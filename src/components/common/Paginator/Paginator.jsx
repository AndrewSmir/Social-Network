import React from "react";
import styles from "../../Users/Users.module.css";

const Paginator = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map(page => {
                return <span className={props.currentPage === page ? styles.selectedPage : null} id={page} key={page}
                             onClick={() => props.setPage(page)}>{page}</span>
            })}
        </div>
    )
}

export default Paginator