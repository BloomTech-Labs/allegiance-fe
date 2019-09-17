import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Tab, Form, Icon } from "semantic-ui-react";
import styled from "styled-components";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";
import useImageUploader from "../utils/useImageUploader";
import { ADD_ALLEGIANCE } from "../../reducers/userReducer";
import Placeholder from '../../assets/Placeholder.png'

const MakeAllegiance = props => {
  //Fetches logged in user's info from redux store.
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
  const dispatch = useDispatch();

  //Fetches Auth0 token for axios call
  const [token] = useGetToken();

  //Imports form custom hook to handle state, form entry and form submission.
  const { values, handleChange, handleSubmit, SubmitButton, ErrorMessage } = useForm(createAllegiance);

  //Imports image upload functions
  const { image, UploaderUI, modalOpen, setModal } = useImageUploader()

  const addAllegiance = async allegiance => {
    try {
      const userAllegiance = await axiosWithAuth([token]).post(
        `/users_allegiances/`,
        {
          user_id: loggedInUser.id,
          allegiance_id: allegiance.id
        }
      );
      const { allegiance_id, allegiance_name, allegiance_image } = userAllegiance.data.newUserAllegiances;
      const newAllegiance = {
        id: allegiance_id,
        name: allegiance_name,
        image: allegiance_image
      };
      dispatch({ type: ADD_ALLEGIANCE, payload: newAllegiance });
      const push = () => props.history.push("/profile");

      setTimeout(push, 1000);
    } catch { console.log("Something went wrong.") }
  };

  async function createAllegiance() {
    try {
      if (image) values.image = image;
      const result = await axiosWithAuth([token]).post(`/allegiances`, values);
      addAllegiance(result.data.newAllegiance);
    } catch { console.log("Something went wrong when creating that allegiance.") }
  }

  const selectOptions = [
    { text: "NFL", value: "NFL" },
    { text: "MLB", value: "MLB" },
    { text: "NBA", value: "NBA" },
    { text: "NHL", value: "NHL" },
    { text: "Other", value: "Other" }
  ]

  return (
    <Tab.Pane attached={false}>
      <Form onSubmit={handleSubmit} error>
        <BasicInfoHolder>
          <Icon name='edit' size='large' color='black' style={{ position: 'absolute', top: '2.8rem', left: '2.8rem' }} onClick={() => setModal(true)} />
          <Modal
            open={modalOpen}
            onClose={() => setModal(false)}
            trigger={
              <ProfilePic
                onClick={() => setModal(true)}
                src={image || values.image || Placeholder} />}>
            <UploaderUI displayImage={image || values.image} />
          </Modal>
        </BasicInfoHolder>
        <Form.Input
          required
          label="Allegiance Name"
          placeholder="Allegiance Name"
          onChange={handleChange}
          value={values.allegiance_name || ""}
          name="allegiance_name"
          type="text"
        />
        <Form.Field
          required
          label="Sport"
          placeholder="Sport"
          onChange={handleChange}
          value={values.sport || ""}
          name="sport"
          control="select"
          type="text"
          options={selectOptions}
        >
        </Form.Field>
        <ErrorMessage />
        <SubmitButton />
      </Form>
    </Tab.Pane>
  );
};

export default MakeAllegiance;

const ProfilePic = styled.img`
  border-color: black;
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  flex: 0 0 auto;
  opacity: .6;
`;

const BasicInfoHolder = styled.div`
  display: flex;
  flex-direction: row;
`;
