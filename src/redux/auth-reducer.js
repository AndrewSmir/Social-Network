import {loginAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = '@@auth-reducer/SET_USER_DATA';
const SET_CAPTCHA_URL = '@@auth-reducer/SET_CAPTCHA_URL'

const initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaURL: null // if null, then captcha is not required
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.url
            }

        default:
            return state

    }
}

export default authReducer

///Action Creators///
export const setUserData = (id, email, login, isAuth, captchaURL) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth, captchaURL}})
const setCaptchaUrl = (url) => ({type: SET_CAPTCHA_URL, url})

///Thunks///

export const getAuthUserDataTC = () => async (dispatch) => { //Задача Thunk - выполнить асинхранную операцию и результат этой операции передать в state через dispatch action-a
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
                if (data.resultCode === 10) {
                    dispatch(getCaptchaURLTC())
                }
                const message = data.messages[0]
                let action = stopSubmit('login', {_error: message}) //actionCreator reduxform В stopSubmit мы передаем 2 параметра: 1 - название формы в нашем state-e (это название мы передаем в HOC reduxForm, когда оборачиваем нашу компоненту), вторым параметром - объект, в котором мы указываем проблемные свойства
                dispatch(action)  //{_error:'Email is wrong'} свойство _error - показывает общую ошибку для всей формы, значение - описание этой ошибки. Описание ошибки попадает в качестве пропсов в валидируемую форму. Т.е. props.error будет выводить описание полученной ошибки.
            }
        })
}

export const logoutTC = () => dispatch => {
    loginAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false, null))
            }
        })
}

export const getCaptchaURLTC = () => async dispatch => {
    const data = await loginAPI.getCaptchaURL();
    const captchaURL = data.url;
    dispatch(setCaptchaUrl(captchaURL))
}