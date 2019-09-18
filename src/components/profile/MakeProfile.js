import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER } from "../../reducers/userReducer";

import { Mixpanel } from "../analytics/Mixpanel";

import useForm from "../utils/useForm";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useImageUploader from "../utils/useImageUploader";

import { Form, Icon, Modal, Segment } from "semantic-ui-react";
import styled from "styled-components"
import Default from "../../assets/walter-avi.png"


const MakeProfile = props => {
	//Fetches logged in user's info from redux store.
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const dispatch = useDispatch();

	//Fetches Auth0 token for axios call
	const [token] = useGetToken();

	//Imports form custom hook to handle state, form entry and form submission.
	const { values, handleChange, handleSubmit, setValues, SubmitButton, ErrorMessage } = useForm(updateUser);

	//Imports image upload functions
	const { image, UploaderUI, modalOpen, setModal } = useImageUploader()

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
	}, [setValues, loggedInUser]);

	return (
		<FormHolder>
			<FormSegment raised color="violet" style={{ margin: 'auto' }}>
				<Form onSubmit={handleSubmit} error>
					<BasicInfoHolder>
						<UploadIcon name='edit' size='large' color='black' onClick={() => setModal(true)} />
						<Modal
							open={modalOpen}
							onClose={() => setModal(false)}
							trigger={<ProfilePic onClick={() => setModal(true)} src={image || values.image || Default} />}>
							<UploaderUI displayImage={image || values.image} />
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
						key={'email'}
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
					<ErrorMessage />
					<SubmitButton />
				</Form>
			</FormSegment>
		</FormHolder>
	)
};

const FormHolder = styled.div`
background-color: #dee4e7;
min-height: 90vh;
padding-top: 5%;
margin-top: -1.5%;
@media (max-width: 320px) {
	height: 87vh
}`

const FormSegment = styled(Segment)`
width: 90%;
margin: auto;
marginBottom: 15%;
`

const BoldInput = styled(Form.Input)`
input: first-child {
	font-weight: bold;
} `

const UploadIcon = styled(Icon)`
position: absolute;
top: 2.8rem;
left: 2.8rem`

const ProfilePic = styled.img`
border-color: black;
object-fit: cover;
width: 100px;
height: 100px;
border-radius: 50%;
border: 1px solid black;
flex: 0 0 auto;
opacity: .6; `

const BasicInfoHolder = styled.div`
display: flex;
flex-direction: row;`

const NameHolder = styled.div`
display: flex;
flex-direction: column;
justify-content: space - evenly;
margin-left: 7px;
margin-bottom: 1rem;
`
export default MakeProfile