import React from "react";
import {
    followUserTC, getUsersTC,
    setCurrentPage, setNextPage, setPreviousPage, unfollowUserTC
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUserSupSel
} from "../../redux/user-selectors";


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    /* - было до Thunk
    componentDidMount() {
        this.props.toggleIsFetching()
        userAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(response => {
                this.props.toggleIsFetching()
                this.props.setUsers(response.items);
                this.props.setTotalUsersCount(response.totalCount)
            })
    }
     */

    setPage = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    setNextPage = () => {
        this.props.setNextPage()
        this.props.getUsers(this.props.currentPage + 1, this.props.pageSize)
    }

    setPreviousPage = () => {
        this.props.setPreviousPage()
        this.props.getUsers(this.props.currentPage - 1, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       setPage={this.setPage}
                       usersPage={this.props.usersPage}
                       currentPage={this.props.currentPage}
                       setNextPage={this.setNextPage}
                       setPreviousPage={this.setPreviousPage}
                       followingInProgress={this.props.followingInProgress}
                       followUser={this.props.followUser}
                       unfollowUser={this.props.unfollowUser}
                />}
        </>
    }
}

/*
const mapStateToProps = (state) => { // connect (функция в самом низу) позволяет нам автоматически вытаскивать state из store. Т.е. он неявно вызывает store.getState() и возвращает нам актуальный state
    return {
        usersPage: state.usersPage.users, //Сюда мы передаем то, что будет указано у нас в качестве пропсов, которые мы передаем в презентационную компоненту. Т.е. в итоге мы полчим презентационную компоненту с пропсами <Dialogs dialogsPage={state.dialogsPage} />
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
};
 */

const mapStateToProps = (state) => {
    return {
        usersPage: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

const mapDispatchToProps = dispatch => {
    return {

        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPage(currentPage))
        },
        setNextPage: () => {
            dispatch(setNextPage())
        },
        setPreviousPage: () => {
            dispatch(setPreviousPage())
        },

        getUsers: (currentPage, pageSize) => {
            dispatch(getUsersTC(currentPage, pageSize))
        },

        followUser: (userId) => {
            dispatch(followUserTC(userId))
        },

        unfollowUser: (userId) => {
            dispatch(unfollowUserTC(userId))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    )(UsersContainer)

/*
//mapDispatchToProps мы можем заменить объектом и connect сам создаст функции обертки, куда будут заложены наши action-creator-ы

export default connect(mapStateToProps, {
    changeFollow,
    setUsers,
    setCurrentPage,
    setNextPage,
    setPreviousPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress
})(UsersContainer)

 */
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