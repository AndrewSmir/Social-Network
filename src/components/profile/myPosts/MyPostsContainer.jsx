import React from "react";
import {addPostActionCreator, changeNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
     return {
         profilePage: state.profilePage
     }
}

const mapDispatchToProps = (dispatch) => {
     return {
         addPost: () => {
             const action = addPostActionCreator()
             dispatch(action);
         },

         changeNewPostText: (text) => {
             const action = changeNewPostTextActionCreator(text)
             dispatch(action)
         }
     }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer