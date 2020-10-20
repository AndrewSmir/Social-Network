import {usersAPI as userAPI} from "../api/api";
import {UserType} from "../types/types";

const CHANGE_FOLLOW = 'CHANGE_FOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_PREVIOUS_PAGE = 'SET_PREVIOUS_PAGE'
const SET_NEXT_PAGE = 'SET_NEXT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'


export type InitialStateType = typeof initialState

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 3, //Значения нужны для определения постраничного вывода.
    totalUsersCount: null as number | null,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users ids

} // добавляем значение state по умолчанию, оно нужно для инициализации state при запуске приложения. Иначе state будет undefined и наш store не создастся

const usersReducer = (state = initialState, action: any): InitialStateType => { //Reducer - функция, через которую идет модификация state
    switch (action.type) {
        case CHANGE_FOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userID ? {...user, followed: !user.followed} : user) //Через users.map() делаем глубокую копию объектов, которые находятся в массиве.
                //нам не нужно делать копию каждого объекта, а только того, который мы будем изменять. Как понять, какой объект изменяем? Для этого в action нам будет приходить свойство userID
                // по значению этого свойства мы и узнаем, копию какго элемента массива объектов мы должны сделать.
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users] //Добавляем в копию массива
            }

        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }

        case SET_PREVIOUS_PAGE:
            if (state.currentPage !== 1) {
                return {
                    ...state, currentPage: state.currentPage - 1
                }
            } else {
                return state
            }

        case SET_NEXT_PAGE:
            return {
                ...state, currentPage: state.currentPage + 1
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: !state.isFetching
            }

        case TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }

        default:
            return state
    }
}

export default usersReducer

///Action Creators///
type ChangeFollowActionType = {
    type: typeof CHANGE_FOLLOW
    userID: number
}
export const changeFollow = (userID: number): ChangeFollowActionType => ({type: CHANGE_FOLLOW, userID});

type SetUsersActionType = {
    type: typeof SET_USERS
    users: any
}
export const setUsers = (users: any): SetUsersActionType => ({type: SET_USERS, users}); //Это AC будет формировать action по загрузке пользователей

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
}
export const toggleIsFetching = (): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING})

type SetPreviousPageActionType = {
    type: typeof SET_PREVIOUS_PAGE
}
export const setPreviousPage = (): SetPreviousPageActionType => ({type: SET_PREVIOUS_PAGE});

type SetNextPageActionType = {
    type: typeof SET_NEXT_PAGE
}
export const setNextPage = (): SetNextPageActionType => ({type: SET_NEXT_PAGE});

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => {
    return {
        type: TOGGLE_IS_FOLLOWING, isFetching, userId
    }
}

///Thunk///

export const getUsersTC = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching())
        const response = await userAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching())
        dispatch(setUsers(response.items))
        dispatch(setTotalUsersCount(response.totalCount))

    }
}

export const followUserTC = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId))
    try {
        const data = await userAPI.followUser(userId)
        if (data.resultCode === 0) {
            dispatch(changeFollow(userId))
        }
    } catch {
        alert('Please, login')
    } finally {
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const unfollowUserTC = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await userAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(changeFollow(userId))
            dispatch(toggleFollowingProgress(false, userId))
        }
    }
}