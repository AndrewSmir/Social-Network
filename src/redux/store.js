import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

const store = {

    _state: {
        dialogsPage: {
            dialogsData: [
                {
                    id: "1",
                    name: 'Dimych',
                    imgSrc: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
                },
                {
                    id: "2",
                    name: 'Андрей',
                    imgSrc: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                },
                {id: "3", name: 'Михалыч', imgSrc: 'https://imgur.com/I80W1Q0.png'},
                {id: "4", name: 'Витек', imgSrc: 'https://image.freepik.com/free-vector/_9385-36.jpg'}
            ],

            messagesData: [
                {id: "1", message: 'hi'},
                {id: "1", message: 'hi how are you'},
                {id: "1", message: 'I\'m fine'},
                {id: "1", message: 'Витек'}
            ],

            newMessageText: ''
        },

        profilePage: {
            postData: [
                {id: 1, message: 'Hi, how are you?', likes: 300},
                {id: 2, message: "It's my first post", likes: 20}
            ],
            newPostText: ''
        },

        sidebar: [
            {
                id: "1",
                name: 'Dimych',
                imgSrc: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
            },
            {id: "2", name: 'Андрей', imgSrc: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'},
            {id: "3", name: 'Михалыч', imgSrc: 'https://imgur.com/I80W1Q0.png'},
            {id: "4", name: 'Витек', imgSrc: 'https://image.freepik.com/free-vector/_9385-36.jpg'}]
    },

    _callSubscriber(){
        console.log('State was changed');
    },

    getState(){
        return this._state
    },

    subscribe(observer){
        this._callSubscriber = observer
    },

    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state)
    },
}

export default store