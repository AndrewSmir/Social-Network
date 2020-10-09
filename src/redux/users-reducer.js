import {usersAPI as userAPI} from "../api/api";

const CHANGE_FOLLOW = 'CHANGE_FOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_PREVIOUS_PAGE = 'SET_PREVIOUS_PAGE'
const SET_NEXT_PAGE = 'SET_NEXT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'

const initialState = {
    users: [],
    pageSize: 3, //Значения нужны для определения постраничного вывода.
    totalUsersCount: null,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

} // добавляем значение state по умолчанию, оно нужно для инициализации state при запуске приложения. Иначе state будет undefined и наш store не создастся

const usersReducer = (state = initialState, action) => { //Reducer - функция, через которую идет модификация state
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
export const changeFollow = (userID) => ({type: CHANGE_FOLLOW, userID});
export const setUsers = (users) => ({type: SET_USERS, users}); //Это AC будет формировать action по загрузке пользователей
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = () => ({type: TOGGLE_IS_FETCHING})
export const setPreviousPage = () => ({type: SET_PREVIOUS_PAGE});
export const setNextPage = () => ({type: SET_NEXT_PAGE});
export const toggleFollowingProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING, isFetching, userId
    }
}

///Thunk///

export const getUsersTC = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching())
        const response = await userAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching())
        dispatch(setUsers(response.items))
        dispatch(setTotalUsersCount(response.totalCount))

    }
}

export const followUserTC = (userId) => async (dispatch) => {
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

export const unfollowUserTC = (userId) => {
    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        const data = await userAPI.unfollowUser(userId)
                if (data.resultCode === 0) {
                    dispatch(changeFollow(userId))
                    dispatch(toggleFollowingProgress(false, userId))
                }
    }
}