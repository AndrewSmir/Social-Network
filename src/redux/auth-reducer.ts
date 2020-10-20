import {loginAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = '@@auth-reducer/SET_USER_DATA';
const SET_CAPTCHA_URL = '@@auth-reducer/SET_CAPTCHA_URL'

/* //можно определять тип так
export type InitialStateType = {
    id: null | number
    email: null | string
    login: null | string
    isFetching: boolean
    isAuth: boolean
    captchaURL: null | string
}
 */ //А можно так

export type InitialStateType = typeof initialState

const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isFetching: false,
    isAuth: false,
    captchaURL: null  as null | string // if null, then captcha is not required
}

const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetUsersDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetUsersDataPayloadActionType
}

type SetUsersDataPayloadActionType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
    captchaURL: string | undefined | null
}

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean, captchaURL?: string): SetUsersDataActionType => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth, captchaURL}
})

export type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL
    url: string
}
const setCaptchaUrl = (url: string): SetCaptchaUrlActionType => ({type: SET_CAPTCHA_URL, url})

///Thunks///

export const getAuthUserDataTC = () => async (dispatch: any) => { //Задача Thunk - выполнить асинхранную операцию и результат этой операции передать в state через dispatch action-a
    const data = await loginAPI.login()

    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setUserData(id, email, login, true)) //Dispatch по умолчанию возвращает нам Promise
    }
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type singInDataType = {
    resultCode: number
    messages: Array<string>
}

export const signInTC = (loginData: LoginDataType) => (dispatch: any) => {
    loginAPI.signIn(loginData)
        .then((data: singInDataType) => {
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

export const logoutTC = () => async (dispatch: any) => {
    const data = loginAPI.logout()
    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }

}

export const getCaptchaURLTC = () => async (dispatch: any) => {
    const data = await loginAPI.getCaptchaURL();
    const captchaURL = data.url;
    dispatch(setCaptchaUrl(captchaURL))
}