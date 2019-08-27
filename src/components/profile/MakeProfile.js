import React, { useEffect, useState } from "react"
import useForm from "../utils/useForm";
import { Form, Button } from 'semantic-ui-react'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken"
import { useSelector, useDispatch } from "react-redux"
import { LOGIN } from "../../actions";

const MakeProfile = props => {
    //Fetches logged in user's info from redux store.
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState()

    //Fetches Auth0 token for axios call
    const [token] = useGetToken();

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit, setValues } = useForm(updateUser);

    //Sends user data as a put request to API to update user info.
    async function updateUser() {
        setLoading(true)
        const result = await axiosWithAuth([token]).put(`/users/${loggedInUser.id}`, values)
        dispatch({ type: LOGIN, payload: result.data.updated })

        const push = () => {
            props.history.push("/profile")
        }

        setTimeout(push, 1000)
    }

    useEffect(() => {
        //Separates user id from user info and then sets the value of each field to the logged in user's info. This auto fills the form fields allowing user's to easily see their current info and enter slight changes without needing to re-enter the entire field.
        let { id, ...userInfo } = loggedInUser
        setValues(userInfo)
    }, [loggedInUser, setValues])

    console.log(values)



    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>First Name
                <input placeholder='First Name'
                        onChange={handleChange}
                        value={values.first_name || ""}
                        name="first_name"
                        type="text" />
                </label>
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name'
                    onChange={handleChange}
                    value={values.last_name || ""}
                    name="last_name"
                    type="text" />
            </Form.Field>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username'
                    onChange={handleChange}
                    value={values.username || ""}
                    name="username"
                    type="text" />
            </Form.Field>
            <Form.Field>
                <label>Banner Image</label>
                <input placeholder='Banner Image'
                    onChange={handleChange}
                    value={values.banner_image || ""}
                    name="banner_image"
                    type="text" />
            </Form.Field>
            <Form.Field>
                <label>Bio</label>
                <input placeholder='Bio'
                    onChange={handleChange}
                    value={values.bio || ""}
                    name="bio"
                    type="text" />
            </Form.Field>
            <Form.Field>
                <label>Profile Image</label>
                <input placeholder='Profile Image'
                    onChange={handleChange}
                    value={values.image || ""}
                    name="image"
                    type="text" />
            </Form.Field>
            <Form.Field>
                <label>Location</label>
                <input placeholder='Location'
                    onChange={handleChange}
                    value={values.location || ""}
                    name="location"
                    type="number" />
            </Form.Field>
            <Form.Field>
                <label>E-mail</label>
                <input placeholder='E-Mail'
                    onChange={handleChange}
                    value={values.email || ""}
                    name="email"
                    type="text" />
            </Form.Field>
            {isLoading
                ? <Button loading>Submit</Button>
                : <Button type='submit'>Submit</Button>}
        </Form>
    )
}


export default MakeProfile;