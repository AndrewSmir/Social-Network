import React from "react";
import styles from "./FormsControl.module.css"

const FormControl = ({input, meta, ...props}) => { //Что сделали с пропсами? При передаче компоненты в свойсво component компоненты Field в переданную компоненту (TextArea)
    //приходят объект props, в котором есть свойства input и meta. Мы деструктуризировали наши пропсы и обозначили переменные, которые в дальнейшем передали в TextArea для обработки
    //...props - будет включать в себя все пропсы, за исключением input и meta
    const hasError = (meta.error && meta.touched)
    return (
        <div className={hasError && `${styles.formControl} ${styles.error}`}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError &&<span>{meta.error}</span>}
            </div>
        </div>
    )
    //{...props} - дальнейшая деструктуризация для того, чтобы мы могли прокинуть отдельные пропсы в компоненту (такие как placeholder и д.р)
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}