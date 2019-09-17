import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER } from "../../reducers/userReducer";

import { Mixpanel } from "../analytics/Mixpanel";

import useForm from "../utils/useForm";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useImageUploader from "../utils/useImageUploader";

import { Form } from "semantic-ui-react";
import styled from "styled-components"

const MakeProfile = props => {
	//Fetches logged in user's info from redux store.
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const dispatch = useDispatch();

	//Fetches Auth0 token for axios call
	const [token] = useGetToken();

	//Imports form custom hook to handle state, form entry and form submission.
	const { values, handleChange, setValues, FormPage } = useForm(updateUser);

	//Imports image upload functions
	const { image } = useImageUploader()

	//Sends user data as a put request to API to update user info.
	async function updateUser() {
		try {
			if (image) values.image = image
			Object.keys(values).forEach((key) => (values[key] === "") && (values[key] = null));
			const result = await axiosWithAuth([token]).put(
				`/users/${loggedInUser.id}`,
				values
			);
			dispatch({ type: UPDATE_USER, payload: result.data.updated });
			Mixpanel.activity(loggedInUser.id, 'Complete Edit Profile')
			const push = () => props.history.push("/profile")
			setTimeout(push, 1000);
		}
		catch {
			Mixpanel.activity(loggedInUser.id, 'Edit Profile Failed')
		}
	}

	useEffect(() => {
		//Separates user id from user info and then sets the value of each field to the logged in user's info. This auto fills the form fields allowing user's to easily see their current info and enter slight changes without needing to re-enter the entire field.
		let { id, ...userInfo } = loggedInUser;
		setValues(userInfo);
		Mixpanel.activity(loggedInUser.id, 'Start Edit Profile')
	}, [loggedInUser, setValues]);

	const nameHolder = (
		<>
			<Form.Group inline style={{ fontSize: '1.2rem' }}>
				<BoldInput
					required
					placeholder="First Name"
					transparent
					onChange={handleChange}
					value={values.first_name || ""}
					name="first_name"
					type="text"
				/>
				<BoldInput
					required
					placeholder="Last Name"
					transparent
					onChange={handleChange}
					value={values.last_name || ""}
					name="last_name"
					type="text"
				/>
			</Form.Group>
			<Form.Input
				placeholder="Bio"
				transparent
				onChange={handleChange}
				value={values.bio || ""}
				name="bio"
				type="text"
			/>
		</>
	)

	const inputs = (
		<>
			<Form.Input
				required
				label="E-mail Address"
				placeholder="E-Mail"
				onChange={handleChange}
				value={values.email || ""}
				name="email"
				type="text" />
			<Form.Input
				required
				label="Username"
				placeholder="Username"
				onChange={handleChange}
				value={values.username || ""}
				name="username"
				type="text"
			/>
			<Form.Input
				required
				label="Zip Code"
				placeholder="Zip Code (To Discover Local Groups)"
				minLength="5"
				maxLength="5"
				onChange={handleChange}
				value={values.location || ""}
				name="location"
				type="text"
			/>
			<Form.Input
				label="Banner Image"
				placeholder="Banner Image"
				onChange={handleChange}
				value={values.banner_image || ""}
				name="banner_image"
				type="text"
			/>
		</>
	)

	return (
		<FormPage nameHolder={nameHolder} inputs={inputs} />
	);
};

const BoldInput = styled(Form.Input)`
input: first-child {
	font-weight: bold;
} `

export default MakeProfile;
