import React, {useState} from "react";
import styles from './ProfileInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../../ProfileStatusWithHooks";
import userPhoto from "../../../../assets/img/user.jpeg";
import ProfileData from "../../ProfileData";
import ProfileDataForm from "../../ProfileDataForm";
import Contact from "../../Contacts";

const ProfileInfo = props => { //Все, что нужно компоненте не импортируется, не берется из глобала, а поступает из пропсов
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
    }

    return (
        <div>
            <img className={styles.profileImage}
                 src="https://process.images.nathab.com/A6dTpd53SmIg0pBfJJhgAz/resize=width:864/quality=value:60/cache=expiry:31536000/compress/https://www.nathab.com/uploaded-files/carousels/HERO/South-America/83-ALT.jpg"
                 alt="IMG"/>
            <img src={props.profile.photos.small || userPhoto} alt="photo" className={styles.mainPhoto}/>
            {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
            {editMode
                ? <ProfileDataForm initialValues={props.profile} profile={props.profile} isOwner={props.isOwner} changeEditMode={setEditMode} onSubmit={onSubmit}/>
                : <ProfileData profile={props.profile} isOwner={props.isOwner} changeEditMode={setEditMode}/>}
            <ProfileStatusWithHooks profileStatus={props.profileStatus} updateUserStatus={props.updateUserStatus}/>
        </div>
    )

}


export default ProfileInfo