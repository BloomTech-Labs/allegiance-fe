import React from "react"
import useForm from "../utils/useForm";
import { Form, Button } from 'semantic-ui-react'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken"
import { useSelector, useDispatch } from "react-redux"
import { LOGIN } from "../../actions";

const MakeProfile = () => {

    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
    const [token] = useGetToken();
    const { values, handleChange, handleSubmit } = useForm(updateUser);
    const dispatch = useDispatch();

    async function updateUser() {
        const result = await axiosWithAuth([token]).put(`/users/${loggedInUser.id}`, values)
        dispatch({ type: LOGIN, payload: result.data.updated })
    }


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
                    type="text" />
            </Form.Field>
            <Form.Field>
                <label>E-mail</label>
                <input placeholder='E-Mail'
                    onChange={handleChange}
                    value={values.email || ""}
                    name="email"
                    type="text" />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default MakeProfile;