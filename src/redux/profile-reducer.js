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
        case ADD_POST: {
            const newPost = {
                id: 2, message: state.newPostText, likes: 0
            };

            return {
                ...state, //делаем спред-оператором поверхностную копию объекта. Теперь мы можем переопределять примитивные значения (такие, как newPostText). При этом
                //мы также получаем в этом массиве и другие объекты, но они не будут представлять собой копию, т.к. хранятся по ссылке.
                postData: [...state.postData, newPost], //Тут мы смотрим, что конкретно будет изменять наш Reducer, основываясь на action.Type. Конкретно в этом случае мы добавляем пост, потому логично, что будет меняться массив с постами.
                //Для того, чтобы мы могли отследить изменения объекта, делаем копию массива PostData и в новый массив мы добавляем newPostText (то же, что и arr.push(newPostText))
                //Теперь у нас есть копия массива PostData, однако элементы этого массива также представляют собой объекты.
                //Копировать конкретно эти объекты нам не требуется, т.к. мы не предполагаем их изменения. Но, если, например, у нас добавится функционал по редактированию постов, то мы должны будем сделать копию и этих постов.
                newPostText: ''
            }
        }

        case CHANGE_NEW_POST_TEXT: {
            return {
                ...state, //Сделали поверхностуню копию state.
                newPostText: action.postText //Т.к. это примитив, то для изменения достаточно только поверхностной копии.
            }
        }

        default:
            return state
    }
}

export default profileReducer

export const addPostActionCreator = () => ({type: ADD_POST});
export const changeNewPostTextActionCreator = (text) =>
    ({type: CHANGE_NEW_POST_TEXT, postText: text});