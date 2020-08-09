import React from "react";
import styles from "./Dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {addMessageActionCreator, changeNewMessageTextActionCreator} from "../../redux/store";

const Dialogs = (props) => {

    const dialogPerson = props.dialogsPage.dialogsData.map(person=> <DialogItem name={person.name} id={person.id} imgSrc={person.imgSrc}/>);
    const messageFromPerson = props.dialogsPage.messagesData.map(message => <Message message={message.message}/>);
    const newMessage = React.createRef();

    const onTextChange = () => {
        let text = newMessage.current.value;
        props.dispatch(changeNewMessageTextActionCreator(text))
    };

    const addMessage = () => {
        props.dispatch(addMessageActionCreator())
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogItems}>
                <ul>
                {dialogPerson}
                </ul>
            </div>
            <div className={styles.messages}>
                {messageFromPerson}
                <textarea className={styles.dialogTextarea} cols="100" rows="5" ref={newMessage} onChange={onTextChange} value={props.dialogsPage.newMessageText} placeholder='Введите сообщение'></textarea>
                <br/>
                <button onClick={addMessage}>Send Message</button>
            </div>
        </div>
    )
}

export default Dialogs