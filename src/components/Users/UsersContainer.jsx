import React, {useEffect} from "react";
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
    getUsers
} from "../../redux/user-selectors";


const UsersContainer = (props) => {

    useEffect(()=>{
        props.getUsers(props.currentPage, props.pageSize)
    }, [])

    const setPage = (pageNumber) => {
        props.setCurrentPage(pageNumber)
        props.getUsers(pageNumber, props.pageSize)
    }

    const setNextPage = () => {
        props.setNextPage()
        props.getUsers(props.currentPage + 1, props.pageSize)
    }

    const setPreviousPage = () => {
        props.setPreviousPage()
        props.getUsers(props.currentPage - 1, props.pageSize)
    }

    return (
        <>
            {props.isFetching ? <Preloader/> :
                <Users totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       setPage={setPage}
                       usersPage={props.usersPage}
                       currentPage={props.currentPage}
                       setNextPage={setNextPage}
                       setPreviousPage={setPreviousPage}
                       followingInProgress={props.followingInProgress}
                       followUser={props.followUser}
                       unfollowUser={props.unfollowUser}
                />}
        </>
    )

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