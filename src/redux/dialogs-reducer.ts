const ADD_MESSAGE = 'ADD-MESSAGE';

export type InitialStateType = typeof initialState

type DialogsDataType = {
    id: string
    name: string
    imgSrc: string
}

type MessagesDataType = {
    id: string
    message: string
}

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
    ] as Array<DialogsDataType>,

    messagesData: [
        {id: "1", message: 'hi'},
        {id: "1", message: 'hi how are you'},
        {id: "1", message: 'I\'m fine'},
        {id: "1", message: 'Витек'}
    ] as Array<MessagesDataType>,
}

//Reducer - чистая функция, которая принимает state, action и возвращает новое состояние state. Если action.type не удовлетворяет условию, то возвращает переданный state

const dialogsReducer = (state = initialState, action: any): InitialStateType => { //action - объект, у которого как минимум есть type
    switch (action.type) {

        case ADD_MESSAGE: {
            const stateCopy = {...state}

            const newMessage = {
                id: "33", message: action.newMessageText
            };
            stateCopy.messagesData = [...state.messagesData] //Массив - это тот же объект и он также хранится по ссылке, поэтому мы точно так же должны создать копию этого объекта, чтобы connect мог следить за изменением объекта и сравнивать его новое и старое состояние
            stateCopy.messagesData.push(newMessage);
            return stateCopy;
        }

        default:
            return state;
    }
}

export default dialogsReducer

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}
export const addMessageActionCreator = (newMessageText: string): AddMessageActionCreatorType => ({type: ADD_MESSAGE, newMessageText})

/*
Зачем мы делаем копию state?
Во первых - копия state нужна нам для ререндера компонента.
Смысл в том, что объекты хранятся в памяти не по значению, а по ссылке и, если мы будем менять state, который мы передали в reducer, то будет меняться и наш первоначальный state.
Функция connect (детали в dialogsContainer) для ререндера должна сравнить 2 состояния объекта: старое и новое, если что-то поменялось, то запустится ререндер объекта.
Но, т.к. state получается один и тот же, что до изменения состояния, что после (т.к. одна и та же ссылка на объект), то перерендер не будет запущен, даже не смотря на то, что по факту мы добавляем новую информацию

Как решить эту проблему?

Мы делаем копию state, которую передаем в reducer и получаем новую ссылку, в которой будет хранится наш новый объект.
В дальнейшем connect будет сравнивать первоначальный state и его копию (НО не объект целиком, а его свойства и значения этих свойств) и, если найдет отличия, то запустит перерендер.

Почему значения свойств? Потому, что 2 объекта никогда не будут равны, если это не хранятся по одной и той же ссылке (другими словами - не один и тот же объект).
А вот значения свойств этих объектов могут быть равны.

Во вторых.
Если мы меняем state, который передаем в функцию, то это нарушает принцип чистых функций
Называется он - имьютабельность. Мы не имеем права модифицировать входящие параметры напрямую
 */