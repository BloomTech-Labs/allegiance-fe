import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER } from "../../reducers/userReducer";

import { Mixpanel } from "../analytics/Mixpanel";

import useForm from "../utils/useForm";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useImageUploader from "../utils/useImageUploader";

import { Form, Segment, Message, Modal, Icon, Button } from "semantic-ui-react";
import styled from "styled-components"

const MakeProfile = props => {
	//Fetches logged in user's info from redux store.
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState();
	const [isError, setError] = useState();
	const [modalOpen, setModal] = useState(false)

	//Fetches Auth0 token for axios call
	const [token] = useGetToken();

	//Imports form custom hook to handle state, form entry and form submission.
	const { values, handleChange, handleSubmit, setValues } = useForm(updateUser);

	//Imports image upload functions
	const { getRootProps, getInputProps, isDragActive, image } = useImageUploader()
	//Sends user data as a put request to API to update user info.
	async function updateUser() {
		setLoading(true);
		if (token) {
			try {
				setError(false)
				if (image) values.image = image
				Object.keys(values).forEach((key) => (values[key] === "") && (values[key] = null));
				const result = await axiosWithAuth([token]).put(
					`/users/${loggedInUser.id}`,
					values
				);
				dispatch({ type: UPDATE_USER, payload: result.data.updated });
				Mixpanel.activity(loggedInUser.id, 'Complete Edit Profile')
				const push = () => {
					props.history.push("/profile");
				};

				setTimeout(push, 1000);
			}
			catch {
				setLoading(false)
				setError(true)
				Mixpanel.activity(loggedInUser.id, 'Edit Profile Failed')
			}
		}
	}

	useEffect(() => {
		//Separates user id from user info and then sets the value of each field to the logged in user's info. This auto fills the form fields allowing user's to easily see their current info and enter slight changes without needing to re-enter the entire field.
		let { id, ...userInfo } = loggedInUser;
		setValues(userInfo);
		Mixpanel.activity(loggedInUser.id, 'Start Edit Profile')
	}, [loggedInUser, setValues]);

	console.log(values);

	return (
		<Segment raised color="blue" style={{ width: "90%", margin: "auto", marginBottom: '15%' }}>
			<Form onSubmit={handleSubmit} error>
				<BasicInfoHolder>
					<Modal
						open={modalOpen}
						onClose={() => setModal(false)}
						trigger={<ProfilePic onClick={() => setModal(true)} src={image || values.image || 'https://react.semantic-ui.com/images/wireframe/image.png'} />}>
						<Modal.Content>
							<Uploader {...getRootProps()} >
								<input {...getInputProps()} />

								<div>
									<Icon name='cloud upload' size='huge' color='violet' inverted />
									{isDragActive
										? <DropText style={{ fontSize: '2rem', padding: '10%' }}>Drop the files here ...</DropText>
										: <><Text style={{ fontSize: '2rem' }}>Drop your image here...</Text> <Text>or</Text>
											<Button color='violet' inverted >Browse Files</Button></>}
								</div>

							</Uploader>
						</Modal.Content>
					</Modal>
					<NameHolder>
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
					</NameHolder>
				</BasicInfoHolder>
				<Form.Input
					required
					label="E-mail Address"
					placeholder="E-Mail"
					onChange={handleChange}
					value={values.email || ""}
					name="email"
					type="text"
				/>
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
					label="Location"
					placeholder="Location"
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
				{isError
					? <Message
						error
						header="Failed to submit form"
						content="Please make sure all fields are filled out accurately." />
					: null}
				{isLoading ? (
					<Button loading>Submit</Button>
				) : (
						<Button type="submit">Submit</Button>
					)}
			</Form>
		</Segment>
	);
};

const ProfilePic = styled.img`
	border-color: black;
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 50%;
	border: 1px solid black;
    flex: 0 0 auto;`

const BasicInfoHolder = styled.div`
    display: flex;
	flex-direction: row;`

const NameHolder = styled.div`
    display: flex;
    flex-direction: column;
	justify-content: space-evenly;
	margin-left: 7px;
	margin-bottom: 1rem;
`

const BoldInput = styled(Form.Input)`
input:first-child {
    font-weight: bold;
}`

const Uploader = styled.div`
background: #fff;
padding: 16px;
width: 90%
border: 2px dashed lightgrey
display: flex
justify-content: center
text-align: center
margin: auto`

const Text = styled.p`
margin: 1rem 0 1rem 0;`

const DropText = styled.p`
font-size: 2rem;
padding: 10%;`

export default MakeProfile;
