import React from "react";
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../common/FormsControl/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import styles from "../common/FormsControl/FormsControl.module.css";

const ProfileDataForm = (props) => {
    /*
    В качестве props в компоненту поступают initialValues, т.к. их структура и структура name в форме (name={'fullName'} name={'lookingForAJob'} и т.д.)
    совпадают, то начальные значения в форме будут равны значениям props.profile
     */
    return (
        <form onSubmit={props.handleSubmit}>
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <p>Name:</p> <Field name={'fullName'} placeholder='Введите имя' component={Input} validate={[requiredField]}/>
            <div>
                <div>
                    <b>Looking for a job:</b> <Field name={'lookingForAJob'} component={Input} type={'checkbox'}/>
                </div>
                <div>
                    <b>My professional skills:</b> <Field name={'lookingForAJobDescription'} placeholder='Ваши навыки' component={Textarea}/>
                </div>
                <div><b>About me:</b><Field name={'aboutMe'} placeholder='Напишите текст о вас' component={Textarea}/></div>
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(props.profile.contacts).map((contact, ind) => {
                return <div style={{marginLeft:'20px'}} key={ind}>
                    <b>{contact}</b> <Field placeholder={contact} name={`contacts.${contact}`} component={Input}/>
                </div>
            })}
            </div>
            <button>save</button>
            <button type={"button"} onClick={()=>props.changeEditMode(false)}>close</button>
        </form>
    )
}

export default compose(
    reduxForm({form:'edit-profile'})
)(ProfileDataForm)