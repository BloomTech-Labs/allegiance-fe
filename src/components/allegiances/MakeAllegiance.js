import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Segment,
  Button,
  Modal,
  Icon,
  Loader,
  Tab,
  Form,
  Message
} from "semantic-ui-react";
import styled from "styled-components";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";
import useImageUploader from "../utils/useImageUploader";
import { ADD_ALLEGIANCE } from "../../reducers/userReducer";

const MakeAllegiance = props => {
  //Fetches logged in user's info from redux store.
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState();
  const [isError, setError] = useState();
  const [modalOpen, setModal] = useState(false);

  //Fetches Auth0 token for axios call
  const [token] = useGetToken();

  //Imports form custom hook to handle state, form entry and form submission.
  const { values, handleChange, handleSubmit } = useForm(createAllegiance);

  //Imports image upload functions
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    image
  } = useImageUploader();

  const addAllegiance = async allegiance => {
    try {
      console.log(allegiance);
      const userAllegiance = await axiosWithAuth([token]).post(
        `/users_allegiances/`,
        {
          user_id: loggedInUser.id,
          allegiance_id: allegiance.id
        }
      );
      const {
        allegiance_id,
        allegiance_name,
        allegiance_image
      } = userAllegiance.data.newUserAllegiances;
      const newAllegiance = {
        id: allegiance_id,
        name: allegiance_name,
        image: allegiance_image
      };
      dispatch({ type: ADD_ALLEGIANCE, payload: newAllegiance });
      const push = () => {
        props.history.push("/profile");
      };

      setTimeout(push, 1000);
    } catch {
      console.log("Something went wrong.");
    }
  };

  async function createAllegiance() {
    setLoading(true);
    if (token) {
      try {
        setError(false);
        if (image) values.image = image;
        Object.keys(values).forEach(
          key => values[key] === "" && (values[key] = null)
        );
        console.log(values);
        const result = await axiosWithAuth([token]).post(
          `/allegiances`,
          values
        );
        console.log(result);
        addAllegiance(result.data.newAllegiance);
      } catch {
        console.log("Something went wrong when creating that allegiance.");
        setLoading(false);
        setError(true);
      }
    }
  }

  return (
    <Tab.Pane attached={false}>
      <Form onSubmit={handleSubmit} error>
        <BasicInfoHolder>
          <Modal
            open={modalOpen}
            onClose={() => setModal(false)}
            trigger={
              <ProfilePic
                onClick={() => setModal(true)}
                src={
                  image ||
                  values.image ||
                  "https://react.semantic-ui.com/images/wireframe/image.png"
                }
                style={{ margin: "1% auto" }}
              />
            }
          >
            <Modal.Content>
              <Uploader {...getRootProps()}>
                <input {...getInputProps()} />
                <div>
                  <Icon
                    name="cloud upload"
                    size="huge"
                    color="violet"
                    inverted
                  />
                  {isDragActive ? (
                    <DropText style={{ fontSize: "2rem", padding: "10%" }}>
                      Drop the files here ...
                    </DropText>
                  ) : (
                    <>
                      <Text style={{ fontSize: "2rem" }}>
                        Drop your image here...
                      </Text>{" "}
                      <Text>or</Text>
                      <Button color="violet" inverted>
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>
              </Uploader>
            </Modal.Content>
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
        >
          <option value="NFL">NFL</option>
          <option value="MLB">MLB</option>
          <option value="NBA">NBA</option>
          <option value="NHL">NHL</option>
          <option value="Other">Other</option>
        </Form.Field>
        {isError ? (
          <Message
            error
            header="Failed to submit form"
            content="Please make sure all fields are filled out accurately."
          />
        ) : null}
        {isLoading ? (
          <Button loading>Submit</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
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
`;

const BasicInfoHolder = styled.div`
  display: flex;
  flex-direction: row;
`;

const Uploader = styled.div`
background: #fff;
padding: 16px;
width: 90%
border: 2px dashed lightgrey
display: flex
justify-content: center
text-align: center
margin: auto`;

const Text = styled.p`
  margin: 1rem 0 1rem 0;
`;

const DropText = styled.p`
  font-size: 2rem;
  padding: 10%;
`;
