import React from "react";
import {addPostActionCreator, changeNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => { //MyPostsContainer - это контейнерная, statefull компонента. Может принимать в себя различные методы и работать со стором.

    const state = props.store.getState()

    const addPost = () => {
        const action = addPostActionCreator()
        props.store.dispatch(action);
    }

    const onTextChange = (text) => {
        const action = changeNewPostTextActionCreator(text)
        props.store.dispatch(action)
    }

    return (
        <MyPosts profilePage={state.profilePage} changeNewPostText={onTextChange} addPost={addPost}/>
    )
}

export default MyPostsContainer