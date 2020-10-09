import React from "react";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import {maxLength, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControl/FormsControls";

const maxLength10 = maxLength(1000)

const AddPost = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'newPostText'} placeholder='Enter your post' component={Textarea} validate={[maxLength10, requiredField]}>
                    </Field>
                </div>
                <div>
                    <button >Add post</button>
                </div>
            </form>
    )
}

export default compose(
    reduxForm({form:'addPost'})
)(AddPost)