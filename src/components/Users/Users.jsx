import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/user.jpeg";

const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = []
    for (let i = 1; i<=pagesCount; i++){
        pages.push(i)
    }

    const page = pages.map(page => {
        return <span className={props.currentPage === page ? styles.selectedPage : null} id={page} onClick={()=>props.setPage(page)}>{page}</span>
    })


    const userItem = props.usersPage.map(user =>
        <div key={user.id}>
            <div>
            <span>
                <div>
                    <img src={user.photos.small ? user.photos.small : userPhoto} className={styles.userPhoto}/>
                </div>
                <div>
                   <button onClick={() => props.changeFollow(user.id)} id={user.id}>
                        {user.followed && 'unfollow'}
                       {!user.followed && 'follow'}
                    </button>
                </div>
            </span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div></div>
                </span>

            </div>
        </div>
    )

    return (
        <div>
            <div>
                {page}
            </div>
            {userItem}
        </div>
    )
}

export default Users