import React from "react";
import { Link } from "react-router-dom";
import { Divider, Icon, Container, Image } from "semantic-ui-react";

import styled from "styled-components";

const GroupCard = props => {
  return (
    <GroupInfoCard>
      <Link to={`/group/${props.group.id}`}>
        <CardContainer>
          <TopDiv>
            {/* <Image src={props.group.image} fluid /> */}
            <CardImage src={props.group.image} alt="GroupAvatar" />
          </TopDiv>
          <MiddleDiv>
            {/* <hr /> */}
            <h4>
              <b>{props.group.group_name}</b>
            </h4>
            {/* <p>{props.group.privacy_setting.toUpperCase()}</p> */}
          </MiddleDiv>
          <BottomDiv>
            {/* <hr /> */}
            <p>
              <Icon name="users" /> {props.group.members.length} members
            </p>
          </BottomDiv>
        </CardContainer>
      </Link>
    </GroupInfoCard>
  );
};

const GroupInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 28vh;
  margin: 2%;
  width: 40%;
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5%;

  &:hover {
    box-shadow: 5px 8px 16px 5px rgba(0, 0, 0, 0.2);
  }
`;

const CardContainer = styled.div`
  height: 100%;
`;

const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const TopDiv = styled.div`
  height: 17vh;
  border-bottom: 1px solid black;
`;
const MiddleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 7vh;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  p {
    align-content: flex-end;
  }
  h4 {
    margin-top: 1%;
    width: 100%;
    // white-space: nowrap;
    overflow: hidden;
    text-overflow: scroll;
    &:hover {
      overflow: visible;
    }
  }
`;
const BottomDiv = styled.div`
  height: 4vh;
  hr {
    color: lightgray;
    margin: 0;
  }
`;

export default GroupCard;
