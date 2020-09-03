import React from "react";
import styles from './ProfileInfo.module.css'

const ProfileInfo = props => {
    return (
        <div>
            <img className={styles.profileImage}
                 src="https://process.images.nathab.com/A6dTpd53SmIg0pBfJJhgAz/resize=width:864/quality=value:60/cache=expiry:31536000/compress/https://www.nathab.com/uploaded-files/carousels/HERO/South-America/83-ALT.jpg"
                 alt="IMG"/>
            <div>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo