import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_GROUP } from "../../reducers/userReducer";
import { VIEW_GROUP } from "../../reducers/navReducer";

import { Mixpanel } from '../analytics/Mixpanel'

import useForm from "../utils/useForm";
import useImageUploader from "../utils/useImageUploader";
import useGetToken from "../utils/useGetToken";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { Form, Button, Segment, Modal, Header, Message, Icon } from "semantic-ui-react";
import styled from "styled-components";

import Placeholder from '../../assets/Placeholder.png'

const CreateGroup = props => {
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState();
	const [modalOpen, setModal] = useState(false);
	const [isError, setError] = useState();

	//Fetches Auth0 token for axios call
	const [token] = useGetToken();

	//Imports image upload functions
	const { getRootProps, getInputProps, isDragActive, image } = useImageUploader()

	//Imports form custom hook to handle state, form entry and form submission.
	const requestType = window.location.pathname.includes("/editgroup/") ? editGroup : createGroup;
	const { values, handleChange, handleSubmit, setValues } = useForm(requestType);

	//If in edit mode, sets group to equal props. Then sets form input values to the group's current info.
	const group = props.location.state ? props.location.state.group : null;
	useEffect(() => {
		window.location.pathname === "/creategroup" && Mixpanel.activity(loggedInUser.id, 'Start Create Group')
		if (group && window.location.pathname.includes("/editgroup/")) {
			let { id, updated_at, created_at, ...groupInfo } = group;
			setValues(groupInfo);
			dispatch({ type: VIEW_GROUP, payload: id });
			Mixpanel.activity(loggedInUser.id, 'Start Edit Group')
		}
	}, [props, setValues, group, loggedInUser.id, dispatch]);

	//Creates a new group and pushes the user to the group page after submission.
	async function createGroup() {
		setLoading(true);
		try {
			setError(false);
			const newGroup = { ...values, image: image, creator_id: loggedInUser.id };
			const result = await axiosWithAuth([token]).post("/groups/", newGroup);
			const addedGroup = {
				name: result.data.newGroup.group_name,
				image: result.data.newGroup.image,
				id: result.data.newGroup.id,
				user_type: "admin"
			};
			dispatch({ type: ADD_GROUP, payload: addedGroup });
			Mixpanel.activity(loggedInUser.id, 'Complete Create Group')
			const push = () => props.history.push(`/group/${result.data.newGroup.id}`);
			setTimeout(push, 1000);
			console.log(result);
		} catch {
			Mixpanel.activity(loggedInUser.id, 'Group Creation Failed')
			setLoading(false);
			setError(true);
		}
	}

	//Edits existing group and pushes the user to the group page after submission.
	async function editGroup() {
		setLoading(true);
		try {
			setError(false);
			const updatedGroup = { ...values, image };
			const result = await axiosWithAuth([token]).put(`/groups/${group.id}`, updatedGroup);
			Mixpanel.activity(loggedInUser.id, 'Complete Edit Group')
			const push = () => props.history.push(`/group/${group.id}`);
			setTimeout(push, 1000);
			console.log(result);
		} catch {
			Mixpanel.activity(loggedInUser.id, 'Group Edit Failed')
			setLoading(false);
			setError(true);
		}
	}

	//Deletes a group.
	async function deleteGroup() {
		setLoading(true);
		try {
			setError(false);
			const result = await axiosWithAuth([token]).delete(`/groups/${group.id}`);
			Mixpanel.activity(loggedInUser.id, 'Complete Delete Group')
			const push = () => props.history.push(`/profile`);
			setTimeout(push, 1000);
			console.log(result);
		} catch {
			Mixpanel.activity(loggedInUser.id, 'Group Deletion Failed')
			setLoading(false);
			setError(true);
		}
	}

	const privacy = values && values.privacy_setting ? values.privacy_setting.charAt(0).toUpperCase() + values.privacy_setting.slice(1) : null

	return (
		<FormHolder>
			<Segment raised color="blue" style={{ width: "90%", margin: "1rem auto" }}>
				<Form onSubmit={handleSubmit} error>
					<BasicInfoHolder>
						<Icon name='edit' corner size='large' color='blue' style={{ position: 'absolute', top: '5.5rem', left: '5rem' }} onClick={() => setModal(true)} />
						<Modal
							open={modalOpen}
							onClose={() => setModal(false)}
							trigger={<GroupLogo
								onClick={() => setModal(true)}
								src={image || values.image || Placeholder} />}>
							<UploadModal>
								<Uploader {...getRootProps()} >
									<input {...getInputProps()} />
									<div>
										<Icon name='cloud upload' size='huge' color='violet' inverted />
										{isDragActive
											? <DropText>Drop the files here ...</DropText>
											: <><Text style={{ fontSize: '2rem' }}>Drop your image here...</Text> <Text>or</Text>
												<Button color='violet' inverted >Browse Files</Button></>}
									</div>
								</Uploader>
								<PreviewHolder>
									Preview of Your New Group Image:
							<GroupLogo src={image || values.image || Placeholder} />
								</PreviewHolder>
								<DoneButton>
									<Button onClick={() => setModal(false)} color='violet' fluid>Done</Button>
								</DoneButton>
							</UploadModal>
						</Modal>
						<NameHolder>
							<BoldInput
								required
								size="medium"
								style={{ marginLeft: "7px" }}
								transparent
								placeholder="Name Your Group"
								onChange={handleChange}
								value={values.group_name || ""}
								name="group_name"
								type="text" />
							<Form.Input
								required
								style={{ marginLeft: "7px" }}
								transparent
								placeholder="Group Slogan"
								onChange={handleChange}
								value={values.description || ""}
								name="description"
								type="text" />
						</NameHolder>
					</BasicInfoHolder>
					<Form.Group widths="equal">
						<Form.Input
							required
							label="Zip Code"
							placeholder="Zip Code"
							minLength="5"
							maxLength="5"
							onChange={handleChange}
							value={values.location || ""}
							name="location"
							type="text" />
						<Form.Input
							required
							label="Acronym"
							placeholder="Acronym"
							maxLength="4"
							onChange={handleChange}
							value={values.acronym || ""}
							name="acronym"
							type="text" />
					</Form.Group>
					<Form.Field
						required
						label="Privacy Setting"
						onChange={handleChange}
						name="privacy_setting"
						control="select"
						defaultValue={values.privacy_setting || ""}>

						<option value={values.privacy_setting}>{privacy || ""}</option>
						{privacy !== "Public" && privacy !== undefined && <option value="public">Public</option>}
						{privacy !== "Private" && privacy !== undefined && <option value="private">Private</option>}
						{privacy !== "Hidden" && privacy !== undefined && <option value="hidden">Hidden</option>}
					</Form.Field>

					<div>
						{isError && <Message
							error
							header="Failed to submit form"
							content="Please make sure all fields are filled out accurately." />}
						{isLoading
							? <Button loading color="green">Submit</Button>
							: <Button type="submit" color="green">Submit</Button>}

						{window.location.pathname === "/editgroup" &&
							<Modal
								closeIcon
								trigger={<Button color="red" type="button">Delete Group</Button>}
								basic
								size="small">
								<Header icon="trash" content="Permanently Delete Group" />
								<Modal.Content>
									<p>
										Clicking Delete will permanently delete your group. Clicking
										the X will cancel the deletion.
								</p>
								</Modal.Content>
								<Modal.Actions>
									<Button color="red" onClick={() => deleteGroup()}>
										Delete
								</Button>
								</Modal.Actions>
							</Modal>}
					</div>
				</Form>
			</Segment>
		</FormHolder>
	)
};

const FormHolder = styled.div`
background-color: #dee4e7;
height: 90vh;
padding-top: 5%;
overflow-y: hidden;
margin-top: -1%;
@media (max-width: 320px) {
	height: 87vh
}`

const GroupLogo = styled.img`
	border-color: black;
	object-fit: cover;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border: 1px solid black;
	flex: 0 0 auto;
`;

const BasicInfoHolder = styled.div`
	display: flex;
	flex-direction: row;
`;

const NameHolder = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	margin-left: 7px;
	margin-bottom: 1rem;
`;

const BoldInput = styled(Form.Input)`
	input:first-child {
		font-weight: bold;
	}
`;

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

const PreviewHolder = styled.div`
	display: flex;
	align-items: center;
	width: 70%;
	margin: 5% auto;`

const DoneButton = styled.div`
	width: 50%;
	display: flex;
	justify-content: center
	margin: auto;`

const UploadModal = styled(Modal.Content)`
:first-child {
				display: flex;
			flex-direction: column;
		}`

export default CreateGroup;
