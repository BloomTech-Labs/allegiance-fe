import React from "react";
import { Placeholder } from "semantic-ui-react"
import styled from "styled-components";
import { device } from "../../styled/device";

const PlaceholderCard = props => {
  return (
    <GroupInfoCard minWidth={props.minWidth}>
      <CardContainer>
        <TopDiv>
          <Placeholder>
            <Placeholder.Image />
          </Placeholder>
        </TopDiv>
        <MiddleDiv color={props.color}>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length='long' />
            </Placeholder.Header>
          </Placeholder>
        </MiddleDiv>
        <BottomDiv>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line length='medium' />
            </Placeholder.Paragraph>
          </Placeholder>
        </BottomDiv>
      </CardContainer>
    </GroupInfoCard>
  );
};

const GroupInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 28vh;
  margin: 1%;
  width: 40%;
  min-width: ${props => {
    return props.minWidth || "none";
  }};
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5%;

  &:hover {
    box-shadow: 5px 8px 16px 5px rgba(0, 0, 0, 0.2);
  }

  @media ${device.tablet} {
    width: 25%;
  }
  @media ${device.laptop} {
    width: 15%;
  }
`;

const CardContainer = styled.div`
  height: 100%;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: center;
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
  color: black;
  }};
  font-weight: heavy;
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
  display: flex;
  height: 4vh;
  color: black;
  justify-content: center;
  align-items: center;
  hr {
    color: lightgray;
    margin: 0;
  }
`;

export default PlaceholderCard;
