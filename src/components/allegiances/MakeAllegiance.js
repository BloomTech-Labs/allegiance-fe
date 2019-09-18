import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Icon, Modal, Segment, Select } from "semantic-ui-react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";
import useImageUploader from "../utils/useImageUploader";
import { ADD_ALLEGIANCE } from "../../reducers/userReducer";
import styled from "styled-components"
import Default from "../../assets/walter-avi.png"

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
    { key: "NFL", text: "NFL", value: "NFL" },
    { key: "MLB", text: "MLB", value: "MLB" },
    { key: "NBA", text: "NBA", value: "NBA" },
    { key: "NHL", text: "NHL", value: "NHL" },
    { key: "Other", text: "Other", value: "Other" }
  ]

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
            defaultValue={values.sport || ""}
            name="sport"
            control={Select}
            options={selectOptions}
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
export default MakeAllegiance;
