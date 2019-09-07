import React from "react";

import { useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";

import styled from "styled-components";
import { Form, Button, TextArea } from "semantic-ui-react";

const PostForm = props => {
  // token for accessing authentication required backend routes
  const [token] = useGetToken();

  const userId = useSelector(state => state.userReducer.loggedInUser.id);
  // useForm custom hook and set timeout custom hook
  const { values, setValues, handleChange, handleSubmit } = useForm(submitPost);

  // callback function to handle submit
  async function submitPost(e) {
    const post = await axiosWithAuth([token]).post(
      `/posts/group/${props.groupId}`,
      {
        user_id: userId,
        group_id: props.groupId,
        post_content: values.post_content
      }
    );
    if (post.data.postResult) {
      setValues("");
      props.setSubmitted(true);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Form.Field
        control={TextArea}
        label="Post"
        placeholder="Write a post to the group..."
        onChange={handleChange}
        name="post_content"
        value={values.post_content || ""}
      />
      {/* <Form.Field control={Button}>Submit Post</Form.Field> */}

      <Button type="submit">Submit</Button>
    </FormContainer>
  );
};

const FormContainer = styled(Form)`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default PostForm;
