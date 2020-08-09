import React from "react";
import Post from "./post/Post";
import styles from "./MyPosts.module.css"
import {addPostActionCreator, changeNewPostTextActionCreator} from "../../../redux/store";


function MyPosts(props) {

    const postElements = props.postData.map(el => <Post message={el.message} like={el.likes}/>);

    const newPostElement = React.createRef();

    const addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    const onTextChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(changeNewPostTextActionCreator(text))
    }


    return (
        <div>
            My posts
            <div>
                <div>
                    <textarea className={styles.postTextarea} ref={newPostElement} onChange={onTextChange}
                              placeholder='Enter your post' value={props.newPostText}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
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