import {getAuthUserDataTC} from "./auth-reducer";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

const initialState = {
    initialized: false
}


export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializingSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeAppTC = () => dispatch => {
    const promise = dispatch(getAuthUserDataTC()) /// !!! getAuthUserDataTC() вернул нам Promise (точнее не сам getAuthReducer, а dispatch(setUserData()), поэтому мы можем делать асинхронные операции
    Promise.all([promise]) // Promise.all = передаем массив, состоящий из промисов. Пока все промисы не выполнятся, то дальнейшие операции не пойдут
        .then(() => dispatch(initializingSuccess()))
}