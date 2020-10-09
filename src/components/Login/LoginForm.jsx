import React from "react";
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControl/FormsControls";
import {maxLength, requiredField} from "../../utils/validators/validators";
import styles from '../common/FormsControl/FormsControl.module.css'

const maxLength30 = maxLength(30)

const LoginForm = (props) => {
    //props.handleSubmit предотвращает стандартное поведение button-a (перезагрузку страницы и отправку данных формы. Также этот коллбэк собирает все данные формы в один объект и отправляет их в
    //качестве аргумента в props.onSubmit(formData)
    //функцию props.onSubmit мы должны передать из верхней компоненты в качестве отдельного пропса, поэтому логику обработки формы мы будем держать во внешнем мире
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={Input} validate={[maxLength30, requiredField]}
                       typeField={'Input'}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input}
                       validate={[maxLength30, requiredField]} typeField={'Input'} type={'password'}/>
            </div>
            <div>
                <Field type="checkbox" name={'rememberMe'} component={'input'}/> Remember me
            </div>
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

/*
const ReduxLoginForm = reduxForm({form:'login'})(LoginForm)
export default ReduxLoginForm

 */

export default compose(
    reduxForm({form: 'login'}) //reduxForm возвращает нам hoc. Для настройки hoc-a мы должны передать в функцию reduxForm объект со свойством form, значением которого будет название обрабатываемой формы. Оно должно быть уникально
)(LoginForm) //когда мы обернем нашу форму hoc-om, который вернет reduxForm, то обернутой компоненте в пропсы поступит много параметров, нам интересен handleSubmit.
