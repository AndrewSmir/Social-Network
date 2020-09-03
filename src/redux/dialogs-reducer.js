const ADD_MESSAGE = 'ADD-MESSAGE';
const CHANGE_NEW_MESSAGE_TEXT = 'CHANGE-NEW-MESSAGE-TEXT';

const initialState = { // добавляем значение state по умолчанию, оно нужно для инициализации state при запуске приложения. Иначе state будет undefined и наш store не создастся. Детали есть в redux-store
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
}

//Reducer - чистая функция, которая принимает state, action и возвращает новое состояние state. Если action.type не удовлетворяет условию, то возвращает переданный state

const dialogsReducer = (state = initialState, action) => { //action - объект, у которого как минимум есть type
    switch (action.type) {
        case CHANGE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.messageText;
            return state;

        case ADD_MESSAGE:
            const newMessage = {
                id: "33", message: state.newMessageText
            };

            state.messagesData.push(newMessage);
            state.newMessageText = '';
            return state;

        default:
            return state;
    }
}

export default dialogsReducer
export const changeNewMessageTextActionCreator = (text) => //actionCreator - функция, которая возвращает нам action
    ({type: CHANGE_NEW_MESSAGE_TEXT, messageText: text});
export const addMessageActionCreator = () => ({type: ADD_MESSAGE})