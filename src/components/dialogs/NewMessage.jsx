import React from "react";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import {Textarea} from "../common/FormsControl/FormsControls";
import {maxLength, requiredField} from "../../utils/validators/validators";

const maxLength50 = maxLength(50)

const NewMessage = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} cols="100" rows="5" placeholder='Введите сообщение' name={'newMessageText'} validate={[maxLength50, requiredField]}></Field>
            <br/>
            <button>Send Message</button>
        </form>
    )
}

export default compose(
    reduxForm({form:'newDialogMessage'})
)(NewMessage)