import React from "react";
import styles from "./Profile.module.css"
import ProfileInfo from "./myPosts/profileInfo/ProfileInfo"
import MyPostsContainer from "./myPosts/MyPostsContainer";

function Profile(props) {
    return (
        <div>
            <ProfileInfo />
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;