import React from "react"
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import Post from "./post/Post";
import AddPost from "./AddPost";

const MyPostsContainer = props => {

    const postElements = props.postsData.map((el, index) => <Post message={el.message}
                                                                  like={el.likes} key={index}/>);

    const onSubmit = (formData) => {
        props.addPost(formData.newPostText)
    }

    return (
        <div>
            My posts
            <AddPost onSubmit={onSubmit}/>
            {postElements}
        </div>
    )
};


const mapStateToProps = (state) => {
     return {
         postsData: state.profilePage.postData,
     }
}

const mapDispatchToProps = (dispatch) => {
     return {
         addPost: (newPostText) => {
             const action = addPostActionCreator(newPostText)
             dispatch(action);
         },
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer)