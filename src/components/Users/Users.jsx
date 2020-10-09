import React, {useEffect, useState} from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/user.jpeg";
import {NavLink} from "react-router-dom";


const Users = (props) => {

    const [curPage, setCurPage] = useState(1)

    useEffect(()=>{
        if (props.currentPage>=10){
            setCurPage(props.currentPage - props.currentPage%10)
        }
    }, [props.currentPage])


    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const page = pages.slice(curPage - 1, curPage + 10).map(page => {
        return <span className={props.currentPage === page ? styles.selectedPage : null} id={page} key={page}
                     onClick={() => props.setPage(page)}>{page}</span>
    })


    const userItem = props.usersPage.map(user =>
        <div key={user.id}>
            <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small ? user.photos.small : userPhoto} className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                   <button disabled={props.followingInProgress.some(id => id === user.id)}
                           onClick={() => {
                               if (!user.followed) {
                                   props.followUser(user.id)
                               } else if (user.followed) {
                                   props.unfollowUser(user.id)
                               }
                           }}
                           id={user.id}>
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
            <div className={styles.pages}>
                <div>
                    {props.currentPage!== 1 && <span onClick={() => props.setPreviousPage()}>Previous Page</span>}
                    {props.currentPage>= 11 && '...'}
                    {page}
                    ...
                </div>
                <span onClick={() => props.setNextPage()}>Next Page</span>
            </div>
            {userItem}
        </div>
    )
}

export default Users

