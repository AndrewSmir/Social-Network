import React, {Component} from "react";
import styles from './Profile.module.css'

class ProfileStatus extends Component {

    state = {
        editMode: false,
        status: this.props.profileStatus
    }

    activateEditMode = () => {
        this.setState({ //в setState передаем объект state и в нем указываются параметры, которые будут меняться.
            editMode: true //setState асинхронный, т.е. смена editMode на true произойдет после выполнения всех синхронных операций, которые будут в нашем методе activateEditMode
        })
        //console.log(this.state.editMode) //Будет false

        /*
        return new Promise(resolve => {
            resolve (this.setState({ //в setState передаем объект state и в нем указываются параметры, которые будут меняться.
                editMode: true //setState асинхронный, т.е. смена editMode на true произойдет после выполнения всех синхронных операций, которые будут в нашем методе activateEditMode
            }))
        }).then(() => console.log(this.state.editMode)) // Покажет верный editMode
         */
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (event) => {
        let text = event.target.value
        this.setState({
            status: text
        })
    }
    //Для синхронизации локального стейта и глобального стейта будем использовать метод componentDidUpdate.
    //Без него у нас будет пустое поле value, а нам нужно, чтобы изначально поле было равно старому статусу.
    componentDidUpdate(prevProps, prevState) { //на вход принимает 2 параметра: prevProps - те пропсы, которые были до обновления компоненты и prevState (аналогично)
        if (prevProps.profileStatus !== this.props.profileStatus) {//Обязательно задаем условие, иначе компонент будет постоянно обновляться
            this.setState({
                status: this.props.profileStatus
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span
                        onDoubleClick={() => this.activateEditMode()}>Status: {this.props.profileStatus || '-------'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onChange={this.onStatusChange} onBlur={() => {
                        this.deactivateEditMode()
                    }} type="text" value={this.state.status}/>
                </div>
                }
            </div>
        )
    }

}

export default ProfileStatus