import React from "react";
import styles from "./Profile.module.css"
import MyPosts from "./myPosts/MyPosts"
import ProfileInfo from "./myPosts/profileInfo/ProfileInfo"

function Profile(props) {
    return (
        <div>
            <ProfileInfo />
            <MyPosts postData={props.profilePage.postData} newPostText={props.profilePage.newPostText} dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile;