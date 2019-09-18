import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_GROUP } from "../../reducers/userReducer";
import { VIEW_GROUP } from "../../reducers/navReducer";

import { Mixpanel } from '../analytics/Mixpanel'

import useForm from "../utils/useForm";
import useImageUploader from "../utils/useImageUploader";
import useGetToken from "../utils/useGetToken";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import DeleteGroup from "./DeleteGroup"

import { Form, Icon, Modal, Segment } from "semantic-ui-react";
import styled from "styled-components";
import Default from "../../assets/walter-avi.png"

const CreateGroup = props => {
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const dispatch = useDispatch();

	//Fetches Auth0 token for axios call
	const [token] = useGetToken();

	//Imports image upload functions
	const { image, UploaderUI, modalOpen, setModal } = useImageUploader()

	//Imports form custom hook to handle state, form entry and form submission.
	const requestType = window.location.pathname.includes("/editgroup/") ? editGroup : createGroup;
	const { values, handleChange, handleSubmit, setValues, SubmitButton, ErrorMessage } = useForm(requestType);

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
		try {
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
		} catch {
			Mixpanel.activity(loggedInUser.id, 'Group Creation Failed')
		}
	}

	//Edits existing group and pushes the user to the group page after submission.
	async function editGroup() {
		try {
			const updatedGroup = { ...values, image };
			const result = await axiosWithAuth([token]).put(`/groups/${group.id}`, updatedGroup);
			Mixpanel.activity(loggedInUser.id, 'Complete Edit Group')
			const push = () => props.history.push(`/group/${group.id}`);
			setTimeout(push, 1000);
			console.log(result);
		} catch {
			Mixpanel.activity(loggedInUser.id, 'Group Edit Failed')
		}
	}

	//Deletes a group.
	async function deleteGroup() {
		try {
			const result = await axiosWithAuth([token]).delete(`/groups/${group.id}`);
			Mixpanel.activity(loggedInUser.id, 'Complete Delete Group')
			const push = () => props.history.push(`/profile`);
			setTimeout(push, 1000);
			console.log(result);
		} catch {
			Mixpanel.activity(loggedInUser.id, 'Group Deletion Failed')
		}
	}

	const privacy = values && values.privacy_setting ? values.privacy_setting.charAt(0).toUpperCase() + values.privacy_setting.slice(1) : null

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
							<BoldInput
								required
								transparent
								placeholder="Name Your Group"
								onChange={handleChange}
								value={values.group_name || ""}
								name="group_name"
								type="text" />
							<Form.Input
								required
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
							label="Acronym (Max 4 Characters)"
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
					<ErrorMessage />
					<SubmitButton />
					{window.location.pathname.includes("/editgroup") && <DeleteGroup delete={deleteGroup} />}
				</Form>
			</FormSegment>
		</FormHolder>
	)
}

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
	input:first-child {
				font-weight: bold;
		}
	`;

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

export default CreateGroup;
