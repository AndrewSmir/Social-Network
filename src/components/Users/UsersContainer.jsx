import React from "react";
import {
    changeFollowAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAc,
    toggleIsFetchingAC
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching()
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching()
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    setPage = (evt) => {
        this.props.toggleIsFetching()
        this.props.setCurrentPage(evt)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${evt}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching()
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching === true ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   setPage={this.setPage}
                   changeFollow={this.props.changeFollow}
                   usersPage={this.props.usersPage}
                   currentPage={this.props.currentPage}
            />
        </>
    }
}

const mapStateToProps = (state) => { // connect (функция в самом низу) позволяет нам автоматически вытаскивать state из store. Т.е. он неявно вызывает store.getState() и возвращает нам актуальный state
    return {
        usersPage: state.usersPage.users, //Сюда мы передаем то, что будет указано у нас в качестве пропсов, которые мы передаем в презентационную компоненту. Т.е. в итоге мы полчим презентационную компоненту с пропсами <Dialogs dialogsPage={state.dialogsPage} />
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
};

const mapDispatchToProps = (dispatch) => { //сюда connect вытащит из нашего store dispatch - т.е. то, где мы обрабатываем наши reducer-ы
    return {
        changeFollow: (userID) => { //Сюда мы передаем функцию, которая будет передана в качестве props в презентационную компоненту. Т.е. в итоге мы получим <Dialogs addMessage={тело нашей функции (которое передаем в качестве значения свойства addMessage} />
            const action = changeFollowAC(userID) //формируем объект Action, чтобы мы могли понять, какую часть store будем менять
            dispatch(action) //dispatch передает action всем нашим reducer-am попорядку, если action удовлетворит условию, то profile-reducer вернет нам новый state
        },
        setUsers: (users) => {
            const action = setUsersAc(users)
            dispatch(action)
        },
        setCurrentPage: (pageNumber) => {
            const action = setCurrentPageAC(pageNumber)
            dispatch(action)
        },
        setTotalUsersCount: (totalCount) => {
            const action = setTotalUsersCountAC(totalCount)
            dispatch(action)
        },
        toggleIsFetching: () => {
            const action = toggleIsFetchingAC();
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

//С помощью функции connect мы можем создать контейнерную компоненту.
//Функция connect принимает в себя 2 параметра, которые представляют собой функции
//Первая функция принимает в качестве параметров state (Обычно эту функцию называют mapStateToProps)
//Вторая функция - dispatch (Обычно называют mapDispatchToProps)
//В результате connect вернет нам функцию, которая в качестве параметра принимает в себя название компоненты,
//вокруг которой мы хотим создать контейнерную компоненту.

/*
Помимо всего этого connect создает свой собственный subscribe, который будет следить, нужно ли компоненте перерисовываться или нет.
Каждый раз, когда происходят изменения в state запускается функция mapStateToProps и формируется новый объект.
новый объект сравнивается со старым объектом (его внутренние составляющие, т.к. объект не может быть равен другому объекту).
Если ичего не меняется, то и компонента не перерисовывается
 */
