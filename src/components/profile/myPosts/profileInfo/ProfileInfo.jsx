import React from "react";
import styles from './ProfileInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../../ProfileStatusWithHooks";

const ProfileInfo = props => { //Все, что нужно компоненте не импортируется, не берется из глобала, а поступает из пропсов
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <img className={styles.profileImage}
                     src="https://process.images.nathab.com/A6dTpd53SmIg0pBfJJhgAz/resize=width:864/quality=value:60/cache=expiry:31536000/compress/https://www.nathab.com/uploaded-files/carousels/HERO/South-America/83-ALT.jpg"
                     alt="IMG"/>
                <div>
                <img src={props.profile.photos.small} alt="photo"/>
                <p>Name: {props.profile.fullName}</p>
                    <ProfileStatusWithHooks profileStatus={props.profileStatus} updateUserStatus={props.updateUserStatus}/>
            </div>
            </div>
        )
    }
}

export default ProfileInfo