import React from "react";
import {addMessageActionCreator, changeNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state) => { // connect (функция в самом низу) позволяет нам автоматически вытаскивать state из store. Т.е. он неявно вызывает store.getState() и возвращает нам актуальный state
    return {
        dialogsPage: state.dialogsPage //Сюда мы передаем то, что будет указано у нас в качестве пропсов, которые мы передаем в презентационную компоненту. Т.е. в итоге мы полчим презентационную компоненту с пропсами <Dialogs dialogsPage={state.dialogsPage} />
    }
};

const mapDispatchToProps = (dispatch) => { //сюда connect вытащит из нашего store dispatch - т.е. то, где мы обрабатываем наши reducer-ы
    return {
        addMessage: () => { //Сюда мы передаем функцию, которая будет передана в качестве props в презентационную компоненту. Т.е. в итоге мы получим <Dialogs addMessage={тело нашей функции (которое передаем в качестве значения свойства addMessage} />
            const action = addMessageActionCreator() //формируем объект Action, чтобы мы могли понять, какую часть store будем менять
            dispatch(action) //dispatch передает action всем нашим reducer-am попорядку, если action удовлетворит условию, то profile-reducer вернет нам новый state
        },

        onTextChange: (text) => {
            const action = changeNewMessageTextActionCreator(text)
            dispatch(action);
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

//С помощью функции connect мы можем создать контейнерную компоненту.
//Функция connect принимает в себя 2 параметра, которые представляют собой функции
//Первая функция принимает в качестве параметров state (Обычно эту функцию называют mapStateToProps)
//Вторая функция - dispatch (Обычно называют mapDispatchToProps)
//В результате connect вернет нам функцию, которая в качестве параметра принимает в себя название компоненты,
//вокруг которой мы хотим создать контейнерную компоненту.

/*
Помимо всего этого connect создает свой собственный subscribe, который будет следить, нужно ли компоненте перерисовываться или нет.
Каждый раз, когда происходят изменения в state запускается функция mapStateToProps и формируется новый объект.
новый объект сравнивается со старым объектом (его внутренние составляющие, т.к. объект не может быть равен другому объекту).
Если ичего не меняется, то и компонента не перерисовывается
 */

export default DialogsContainer