const ADD_POST = 'ADD-POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';

const initialState = {
    postData: [
        {id: 1, message: 'Hi, how are you?', likes: 300},
        {id: 2, message: "It's my first post", likes: 20}
    ],
        newPostText: ''
} // добавляем значение state по умолчанию, оно нужно для инициализации state при запуске приложения. Иначе state будет undefined и наш store не создастся

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST:
            const newPost = {
                id: 2, message: state.newPostText, likes: 0
            };

            state.postData.push(newPost);
            state.newPostText = '';
            return state

        case CHANGE_NEW_POST_TEXT:
            state.newPostText = action.postText;
            return state

        default:
            return state
    }
}

export default profileReducer

export const addPostActionCreator = () => ({type: ADD_POST});
export const changeNewPostTextActionCreator = (text) =>
    ({type: CHANGE_NEW_POST_TEXT, postText: text});