import React from "react";
import {addMessageActionCreator, changeNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    const state = props.store.getState()

    const addMessage = () => {
        const action = addMessageActionCreator() //формируем объект Action, чтобы мы могли понять, какую часть store будем менять
        props.store.dispatch(action);
    }

    const onTextChange = (text) => {
        const action = changeNewMessageTextActionCreator(text)
        props.store.dispatch(action);
    };

    return (
        <Dialogs dialogsPage={state.dialogsPage} addMessage={addMessage} onTextChange={onTextChange}/>
    )
}

export default DialogsContainer