import React from "react";
import Post from "./post/Post";

function MyPosts() {
    return(
        <div>
            My posts
            <div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <button>Add post</button>
                <button>Remove text</button>
            </div>
            <Post message='Hi, how are you?' like="300"/>
            <Post message="It's my first post" like='20'/>
        </div>
    )
}

export default MyPosts