import React, {useEffect, useState} from "react";
import styles from './Profile.module.css'

const ProfileStatusWithHooks = (props) => {
    /*
    Хуки нельзя использовать в условиях:
    if(props.profileStatus === 'something){
        const [editMode, setEditMode] = useState(false) -НЕЛЬЗЯ
        }

     Нельзя испольовать в циклах
     */


    //useState(false) //хук useState возвращает нам массив из 2-х элементов. 1-й элемент - параметр, который мы передаем в качестве аргумента в useState. Этот параметр устанавливает initialState компоненты. Второй параметр - функция, которая изменяет первый параметр.
    const [editMode, setEditMode] = useState(false) //деструктурирующим присваиванием получаем наш initial state и функцию, которой мы будем менять стейт
    const [profileStatus, setProfileStatus] = useState(props.profileStatus)

    useEffect(()=>{
        setProfileStatus(props.profileStatus)
    }, [props.profileStatus])
    //если не передаем второй параметр (массив с зависомостями), то выполняется после каждой отрисовки.
    // если передаем вторым параметром пустой массив, то выполнится один раз после вмотирования в dom
    //useEffect выполняется, когда будет завершена отрисовка страницы, когда она уже будет вмонтирована в dom
    //вторым параметром для useEffect мы передаем массив, элементами которого будут являться зависимости, т.е. то, что будет триггером для срабатывания useEffect.
    //useEffect будет срабатывать только тогда, когда каждая конкретная зависимость не будет равна своему значению из предыдущего рендера.
    //Например, нам пришел props.profileStatus === ''
    //После первого рендера страницы будет запущен useState, т.к. мы устанавливаем первоначальную инициализацию profileStatus.
    //В дальнейшем useEffect будет срабатывать только при изменении props.profileStatus, конкретно в нашем случае после вызова функции deactivateEditMode

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        props.updateUserStatus(profileStatus)
        setEditMode(false)
    }

    const onStatusChange = (event) => {
        let text = event.target.value
        setProfileStatus(text)
    }

    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={() => activateEditMode()}>Status: {props.profileStatus || '-------'}</span>
            </div>}
            {editMode && <div>
                <input autoFocus={true} onBlur={()=> deactivateEditMode()} value={profileStatus} onChange={onStatusChange} type="text"/>
            </div>}
        </div>
    )

}

export default ProfileStatusWithHooks