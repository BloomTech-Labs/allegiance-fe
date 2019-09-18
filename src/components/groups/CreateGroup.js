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

import { Form } from "semantic-ui-react";
import styled from "styled-components";

const CreateGroup = props => {
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const dispatch = useDispatch();

	//Fetches Auth0 token for axios call
	const [token] = useGetToken();

	//Imports image upload functions
	const { image } = useImageUploader();

	//Imports form custom hook to handle state, form entry and form submission.
	const requestType = window.location.pathname.includes("/editgroup/") ? editGroup : createGroup;
	const { values, handleChange, setValues, FormPage } = useForm(requestType);

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

	const nameHolder = (
		<>
			<BoldInput
				required
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
		</>
	)

	const inputs = (
		<>
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
			{window.location.pathname === "/editgroup" && <DeleteGroup delete={deleteGroup} />}
		</>
	)

	return <FormPage nameHolder={nameHolder} inputs={inputs} />
}

const BoldInput = styled(Form.Input)`
	input:first-child {
		font-weight: bold;
	}
`;

export default CreateGroup;
