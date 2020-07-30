import React from "react";
import styles from "./Profile.module.css"

function Profile() {
    return (
        <div className={styles.content}>
            <img
                src="https://process.images.nathab.com/A6dTpd53SmIg0pBfJJhgAz/resize=width:864/quality=value:60/cache=expiry:31536000/compress/https://www.nathab.com/uploaded-files/carousels/HERO/South-America/83-ALT.jpg"
                alt="IMG"/>
            <div>
                ava + description
            </div>
            <div>
                My posts
                <div>
                    New post
                </div>
            </div>
            <div>
                post1
            </div>
            <div>
                post2
            </div>
        </div>
    )
}

export default Profile;