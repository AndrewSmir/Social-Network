import {createSelector} from "reselect";

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getUsers = (state) => {
    return state.usersPage.users
}

/*
export const getUserSupSel = createSelector(getUsers, getIsFetching, (users, fetching)=> {
    return users.filter(u=>true)
})
 */

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}