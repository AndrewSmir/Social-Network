import React from "react";
import styles from "./Dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import NewMessage from "./NewMessage";

const Dialogs = (props) => {

    const dialogPerson = props.dialogsPage.dialogsData.map(person=> <DialogItem name={person.name} id={person.id} imgSrc={person.imgSrc}/>);
    const messageFromPerson = props.dialogsPage.messagesData.map(message => <Message message={message.message}/>);

    const addMessage = (formData) => {
        props.addMessage(formData.newMessageText)
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
                <NewMessage onSubmit={addMessage}/>
            </div>
        </div>
    )
}

export default Dialogs