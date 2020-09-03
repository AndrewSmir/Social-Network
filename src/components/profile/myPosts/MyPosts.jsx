import React from "react";
import Post from "./post/Post";
import styles from "./MyPosts.module.css"
import {addPostActionCreator, changeNewPostTextActionCreator} from "../../../redux/profile-reducer";


function MyPosts(props) {

    const postElements = props.profilePage.postData.map(el => <Post message={el.message} like={el.likes}/>);

    const onAddPost = () => {
        props.addPost()
    }

    const onTextChange = (event) => {
        let text = event.target.value
        props.changeNewPostText(text)
    }

    return (
        <div>
            My posts
            <div>
                <div>
                    <textarea className={styles.postTextarea} onChange={onTextChange}
                              placeholder='Enter your post' value={props.profilePage.newPostText}></textarea>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
                <div>
                    <button>Remove text</button>
                </div>
            </div>
            {postElements}
        </div>
    )
}

export default MyPosts