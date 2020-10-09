import React from "react";

const Contact = (props) => {
    return (
        <div style={{marginLeft:'20px'}}>
            <b>{props.contactTitle}</b>: {props.contactValue}
        </div>
    )
}

export default Contact