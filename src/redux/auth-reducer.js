import {loginAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const CLEAR_USER_DATA = 'CLEAR_USER_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state

    }
}

export default authReducer

///Action Creators///
export const setUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})

///Thunks///

export const getAuthUserDataTC = () => async (dispatch) => {
    const data = await loginAPI.login()

    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setUserData(id, email, login, true)) //Dispatch по умолчанию возвращает нам Promise
    }
}

export const signInTC = (loginData) => dispatch => {
    loginAPI.signIn(loginData)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserDataTC())
            } else {
                const message = data.messages.length > 0 ? data.messages[0] : 'Some Error'
                let action = stopSubmit('login', {_error: message}) //actionCreator reduxform В stopSubmit мы передаем 2 параметра: 1 - название формы в нашем state-e (это название мы передаем в HOC reduxForm, когда оборачиваем нашу компоненту), вторым параметром - объект, в котором мы указываем проблемные свойства
                dispatch(action)  //{_error:'Email is wrong'} свойство _error - показывает общую ошибку для всей формы, значение - описание этой ошибки. Описание ошибки попадает в качестве пропсов в валидируемую форму. Т.е. props.error будет выводить описание полученной ошибки.
            }
        })
}

export const logoutTC = () => dispatch => {
    loginAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
}