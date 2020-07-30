import React from "react";
import styles from "./Profile.module.css"
import MyPosts from "./myPosts/MyPosts"

function Profile() {
    return (
        <div>
            <img
                src="https://process.images.nathab.com/A6dTpd53SmIg0pBfJJhgAz/resize=width:864/quality=value:60/cache=expiry:31536000/compress/https://www.nathab.com/uploaded-files/carousels/HERO/South-America/83-ALT.jpg"
                alt="IMG"/>
            <div>
                ava + description
            </div>
            <MyPosts/>
        </div>
    )
}

export default Profile;