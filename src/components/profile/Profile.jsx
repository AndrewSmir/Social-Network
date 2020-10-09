import React from "react";
import styles from "./Profile.module.css"
import ProfileInfo from "./myPosts/profileInfo/ProfileInfo"
import MyPosts from "./myPosts/MyPostsContainer";


function Profile(props) {

    return (
        <div>
            <ProfileInfo profile={props.profile} profileStatus={props.profileStatus} updateUserStatus={props.updateUserStatus}/>
            <MyPosts />
        </div>
    )
}

export default Profile;