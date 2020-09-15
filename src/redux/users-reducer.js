const CHANGE_FOLLOW = 'CHANGE_FOLLOW';
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    users: [],
    pageSize: 3, //Значения нужны для определения постраничного вывода.
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false

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

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.count
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: !state.isFetching
            }

        default:
            return state
    }
}

export default usersReducer

export const changeFollowAC = (userID) => ({type: CHANGE_FOLLOW, userID});
export const setUsersAc = (users) => ({type: SET_USERS, users}); //Это AC будет формировать action по загрузке пользователей
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetchingAC = () => ({type: TOGGLE_IS_FETCHING})