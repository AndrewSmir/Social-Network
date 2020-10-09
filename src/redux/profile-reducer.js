import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = '@@auth-reducer/ADD-POST';
const SET_USER_PROFILE = '@@auth-reducer/SET_USER_PROFILE';
const SET_USER_PROFILE_STATUS = '@@auth-reducer/SET_USER_PROFILE_STATUS'
const DELETE_POST = '@@auth-reducer/DELETE_POST'
const SAVE_PHOTOS_SUCCESS = '@@auth-reducer/SAVE_PHOTOS_SUCCESS'

const initialState = {
    postData: [
        {id: 1, message: 'Hi, how are you?', likes: 300},
        {id: 2, message: "It's my first post", likes: 20}
    ],
    profile: null,
    profileStatus: null
} // добавляем значение state по умолчанию, оно нужно для инициализации state при запуске приложения. Иначе state будет undefined и наш store не создастся

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 3, message: action.newPostText, likes: 0
            };

            return {
                ...state, //делаем спред-оператором поверхностную копию объекта. Теперь мы можем переопределять примитивные значения (такие, как newPostText). При этом
                //мы также получаем в этом массиве и другие объекты, но они не будут представлять собой копию, т.к. хранятся по ссылке.
                postData: [...state.postData, newPost], //Тут мы смотрим, что конкретно будет изменять наш Reducer, основываясь на action.Type. Конкретно в этом случае мы добавляем пост, потому логично, что будет меняться массив с постами.
                //Для того, чтобы мы могли отследить изменения объекта, делаем копию массива PostData и в новый массив мы добавляем newPostText (то же, что и arr.push(newPostText))
                //Теперь у нас есть копия массива PostData, однако элементы этого массива также представляют собой объекты.
                //Копировать конкретно эти объекты нам не требуется, т.к. мы не предполагаем их изменения. Но, если, например, у нас добавится функционал по редактированию постов, то мы должны будем сделать копию и этих постов.
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }

        case SET_USER_PROFILE_STATUS: {
            return {
                ...state, profileStatus: action.status
            }
        }

        case DELETE_POST: {
            return {
                ...state, postData: state.postData.filter(post => post.id !== action.postId)
            }
        }

        case SAVE_PHOTOS_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }

        default:
            return state
    }
}

export default profileReducer


///Action Creators///
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserProfileStatus = (status) => ({type: SET_USER_PROFILE_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTOS_SUCCESS, photos})

///Thunks///

export const setProfileTC = (userId) => async dispatch => {
    let data = await profileAPI.setProfile(userId)
    dispatch(setUserProfile(data))
}

export const getProfileStatusTC = (userId) => async dispatch => {
    const status = await profileAPI.getStatus(userId)
    dispatch(setUserProfileStatus(status))
}

export const updateProfileStatusTC = (status) => async dispatch => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setUserProfileStatus(status))
    }
}

export const savePhotoTC = (file) => async dispatch => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileTC = (profileData) => async (dispatch, getState) => {
    const userId = getState().authReducer.id
    let response = await profileAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(setProfileTC(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
    }

}