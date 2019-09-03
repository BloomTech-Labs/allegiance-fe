import React, { useEffect, useState } from "react";
import useForm from "../utils/useForm";
import { Form, Button, Segment } from "semantic-ui-react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER } from "../../reducers/userReducer";

const MakeProfile = props => {
	//Fetches logged in user's info from redux store.
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState();

	//Fetches Auth0 token for axios call
	const [token] = useGetToken();

	//Imports form custom hook to handle state, form entry and form submission.
	const { values, handleChange, handleSubmit, setValues } = useForm(updateUser);

	//Sends user data as a put request to API to update user info.
	async function updateUser() {
		setLoading(true);
		if (token) {
			const result = await axiosWithAuth([token]).put(
				`/users/${loggedInUser.id}`,
				values
			);
			dispatch({ type: UPDATE_USER, payload: result.data.updated });

			const push = () => {
				props.history.push("/profile");
			};

			setTimeout(push, 1000);
		}
	}

	useEffect(() => {
		//Separates user id from user info and then sets the value of each field to the logged in user's info. This auto fills the form fields allowing user's to easily see their current info and enter slight changes without needing to re-enter the entire field.
		let { id, ...userInfo } = loggedInUser;
		setValues(userInfo);
	}, [loggedInUser, setValues]);

	console.log(values);

	return (
		<Segment raised color="blue" style={{ width: "90%", margin: "auto", marginBottom: '15%' }}>
			<Form onSubmit={handleSubmit}>
				<h1>Edit Profile</h1>
				<Form.Input
					label="E-mail Address"
					placeholder="E-Mail"
					onChange={handleChange}
					value={values.email || ""}
					name="email"
					type="text"
				/>
				<Form.Input
					label="Username"
					placeholder="Username"
					onChange={handleChange}
					value={values.username || ""}
					name="username"
					type="text"
				/>
				<Form.Input
					label="First Name"
					placeholder="First Name"
					onChange={handleChange}
					value={values.first_name || ""}
					name="first_name"
					type="text"
				/>
				<Form.Input
					label="Last Name"
					placeholder="Last Name"
					onChange={handleChange}
					value={values.last_name || ""}
					name="last_name"
					type="text"
				/>
				<Form.Input
					label="Bio"
					placeholder="Bio"
					onChange={handleChange}
					value={values.bio || ""}
					name="bio"
					type="text"
				/>
				<Form.Input
					label="Location"
					placeholder="Location"
					onChange={handleChange}
					value={values.location || ""}
					name="location"
					type="number"
				/>
				<Form.Input
					label="Banner Image"
					placeholder="Banner Image"
					onChange={handleChange}
					value={values.banner_image || ""}
					name="banner_image"
					type="text"
				/>
				<Form.Input
					label="Profile Image"
					placeholder="Profile Image"
					onChange={handleChange}
					value={values.image || ""}
					name="image"
					type="text"
				/>
				{isLoading ? (
					<Button loading>Submit</Button>
				) : (
						<Button type="submit">Submit</Button>
					)}
			</Form>
		</Segment>
	);
};

export default MakeProfile;
