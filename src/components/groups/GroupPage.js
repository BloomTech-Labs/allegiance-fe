import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import { useSelector } from "react-redux";

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

const GroupPage = props => {
  const [token] = useGetToken();
  const id = props.match.params.id;

  const [group, setGroup] = useState({});
  const [allegiances, setAllegiances] = useState([]);
  const [userType, setUserType] = useState({});

  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosWithAuth([token]).get(`/groups/${id}`);
      setGroup(response.data.group);
      setAllegiances(response.data.allegiances);
      console.log("data:", response.data);
    };
    const fetchDataUserType = async () => {
      const response = await axiosWithAuth([token]).post(
        `/groups_users/search`,
        {
          //   user_id: loggedInUser.id,
          user_id: 1,
          group_id: id
        }
      );
      if (response.data.relationExists) {
        setUserType(response.data.relationExists[0].user_type);
      }
    };
    fetchData();
    fetchDataUserType();
  }, [token, id, loggedInUser]);

  console.log("group:", group);
  console.log("LIU", loggedInUser.id);
  console.log("userType", userType);
  return (
    <GroupPageContainer>
      <GroupInfoDiv>
        <h1 className="h1">{group.group_name}</h1>
        <h3>{group.privacy_setting}</h3>

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
      <GroupMemberStatus>
        {Object.keys(userType).length && (
          <>
            {userType === "admin" && (
              <>
                <Button>Admin</Button>
              </>
            )}
          </>
        )}
        <Button>Join Group</Button>
        {/* {(Object.keys(userType).length) ? userType : <Button>Join Group</Button>} */}
      </GroupMemberStatus>
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
  width: 100%;
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

const FormContainer = styled(Form)`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostsContainer = styled.div`
  display: flex;
`;

const GroupMemberStatus = styled.div`
  display: flex;
  justify-content: center;
`;

export default GroupPage;
