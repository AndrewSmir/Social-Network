import {getAuthUserDataTC} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}


export const appReducer = (state = initialState, action: any): InitialStateType => { //тип возвращаемого значения указываем после параметров, которые передаем в функцию
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

type InitializingSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS //typeof при компиляции выводит тип, который равен значению константы
}

export const initializingSuccess = (): InitializingSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeAppTC = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserDataTC()) /// !!! getAuthUserDataTC() вернул нам Promise (точнее не сам getAuthReducer, а dispatch(setUserData()), поэтому мы можем делать асинхронные операции
    Promise.all([promise]) // Promise.all = передаем массив, состоящий из промисов. Пока все промисы не выполнятся, то дальнейшие операции не пойдут
        .then(() => dispatch(initializingSuccess()))
}