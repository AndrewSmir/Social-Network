import React from "react";
import styles from "./Dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";

const Dialogs = (props) => {

    const dialogPerson = props.dialogsPage.dialogsData.map(person=> <DialogItem name={person.name} id={person.id} imgSrc={person.imgSrc}/>);
    const messageFromPerson = props.dialogsPage.messagesData.map(message => <Message message={message.message}/>);

    const onTextChange = (event) => {
        let text = event.target.value;
        props.onTextChange(text)
    };

    const addMessage = () => {
        props.addMessage()
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
                <textarea className={styles.dialogTextarea} cols="100" rows="5" onChange={onTextChange} value={props.dialogsPage.newMessageText} placeholder='Введите сообщение'></textarea>
                <br/>
                <button onClick={addMessage}>Send Message</button>
            </div>
        </div>
    )
}

export default Dialogs