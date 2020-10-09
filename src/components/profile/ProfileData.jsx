import React from "react";
import Contact from "./Contacts";

const ProfileData = (props) => {

    return (
        <div>
            <p>Name: {props.profile.fullName}</p>
            <div>
                <div><b>Looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'nope'} </div>
                <div>
                    <b>My professional skills:</b> {props.profile.lookingForAJobDescription}
                </div>
                <div><b>About me:</b>{props.profile.aboutMe}</div>
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(props.profile.contacts).map((contact, ind) => {
                return <Contact key={contact} contactTitle={contact}
                                contactValue={props.profile.contacts[contact]}/>
            })}
            </div>
            {props.isOwner && <button onClick={()=>props.changeEditMode(true)}>edit</button>}
        </div>
    )
}

export default ProfileData