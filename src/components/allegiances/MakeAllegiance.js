import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "semantic-ui-react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";
import useImageUploader from "../utils/useImageUploader";
import { ADD_ALLEGIANCE } from "../../reducers/userReducer";

const MakeAllegiance = props => {
  //Fetches logged in user's info from redux store.
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
  const dispatch = useDispatch();

  //Fetches Auth0 token for axios call
  const [token] = useGetToken();

  //Imports form custom hook to handle state, form entry and form submission.
  const { values, handleChange, FormPage } = useForm(createAllegiance);

  //Imports image upload functions
  const { image } = useImageUploader()

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

  //Inputs to add to the form.
  const inputs = (
    <>
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
      />
    </>
  )

  return <FormPage inputs={inputs} />
};

export default MakeAllegiance;
