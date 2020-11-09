import React, {FC, useEffect, useState} from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/user.jpeg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";


type UsersPropsType = {
    currentPage: number
    followUser: (userId: number) => void
    followingInProgress: Array<number>
    pageSize: number
    setNextPage: () => void
    setPage: (pageNumber: number) => void
    setPreviousPage: () => void
    totalUsersCount: number
    unfollowUser: (userId: number) => void
    usersPage: Array<UserType>
}


const Users: FC<UsersPropsType> = (props) => {

    const {
        currentPage,
        followUser,
        followingInProgress,
        pageSize,
        setNextPage,
        setPage,
        setPreviousPage,
        totalUsersCount,
        unfollowUser,
        usersPage
    } = props

    const [curPage, setCurPage] = useState(1)

    useEffect(() => {
        if (currentPage >= 10) {
            setCurPage(currentPage - currentPage % 10)
        }
    }, [currentPage])


    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const page = pages.slice(curPage - 1, curPage + 10).map(page => {
        return <span className={currentPage === page ? styles.selectedPage : undefined} key={page}
                     onClick={() => setPage(page)}>{page}</span>
    })


    const userItem = usersPage.map(user =>
        <div key={user.id}>
            <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small ? user.photos.small : userPhoto} className={styles.userPhoto} alt='photo'/>
                    </NavLink>
                </div>
                <div>
                   <button disabled={followingInProgress.some(userId => userId === user.id)}
                           onClick={() => {
                               if (!user.followed) {
                                   followUser(user.id)
                               } else if (user.followed) {
                                   unfollowUser(user.id)
                               }
                           }}>
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
                </span>
            </div>
        </div>
    )

    return (
        <div>
            <div className={styles.pages}>
                <div>
                    {currentPage !== 1 && <span onClick={() => setPreviousPage()}>Previous Page</span>}
                    {currentPage >= 11 && '...'}
                    {page}
                    ...
                </div>
                <span onClick={() => setNextPage()}>Next Page</span>
            </div>
            {userItem}
        </div>
    )
}

export default Users

