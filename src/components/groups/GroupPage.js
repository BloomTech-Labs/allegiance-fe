import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import styled from "styled-components";
import {
  Image,
  Popup,
  Form,
  Input,
  Button,
  TextArea,
  Divider
} from "semantic-ui-react";

const GroupPage = () => {
  const [token] = useGetToken();
  const id = 1;
  const [group, setGroup] = useState({});
  const [allegiances, setAllegiances] = useState([]);
  useEffect(() => {
    const fetchData = async id => {
      const response = await axiosWithAuth([token]).get(
        `https://labs15-allegiance-staging.herokuapp.com/api/groups/${id}`
        // `http://localhost:5000/api/groups/${id}`
      );
      setGroup(response.data.group);
      setAllegiances(response.data.allegiances);
      console.log("data:", response.data);
    };

    fetchData(id);
  }, [token, id]);

  console.log("allegiances:", allegiances);

  return (
    <GroupPageContainer>
      <GroupInfoDiv>
        <h1 className="h1">{group.group_name}</h1>
        <h3>Groups Allegiances</h3>
        {/* <div>{allegiances.map(al => al.name)}</div> */}
        <LogoHolder>
          {allegiances.map(al => (
            <div key={al.id}>
              <Popup trigger={<Image src={al.image} size="mini" circular />} />
              {al.name}
            </div>
          ))}
        </LogoHolder>
      </GroupInfoDiv>
      <Divider />

      <PostsContainer>{/* posts go here */}</PostsContainer>

      {/* Form for adding posts to group */}
      <Form>
        <FormContainer>
          <Form.Field
            control={TextArea}
            label="Post"
            placeholder="write a post to the group..."
          />
          <Form.Field control={Button}>Submitpost</Form.Field>
        </FormContainer>
      </Form>
    </GroupPageContainer>
  );
};

const GroupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5rem;
`;

const GroupInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LogoHolder = styled.div`
  display: flex;
  flexdirection: row;
  justify-content: center;
`;

const FormContainer = styled.div`
  margin-top: 5vh;
  display: flex;
  flexdirection: column;
  justify-content: center;
`;

const PostsContainer = styled.div`
  display: flex;
`;

export default GroupPage;
