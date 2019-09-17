import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Icon, Popup } from "semantic-ui-react";
import styled from "styled-components";

const MyAllegiances = props => {
  return (
    <LogoHolder>
      {props.type === "allegiances" ? (
        <div style={{ margin: "1%" }}>
          <Link to={`/addallegiance`}>
            <Popup
              content={"Declare your Allegiance"}
              trigger={
                <Icon
                  name="plus"
                  size="big"
                  circular
                  inverted
                  color="blue"
                  style={{ fontSize: "2.16rem" }}
                />
              }
            />
          </Link>
        </div>
      ) : null}
      {props.content.map(allegiance => (
        <div key={allegiance.id} style={{ margin: "1% 2% 2%" }}>
          <Modal closeIcon trigger={<AllegianceLogo src={allegiance.image} />}>
            <Modal.Header>{allegiance.name}</Modal.Header>
            <Modal.Actions>
              <Button
                onClick={() => props.leaveAllegiance(allegiance.id)}
                color="red"
              >
                <Icon name="remove" /> Leave Allegiance
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      ))}
    </LogoHolder>
  );
};

const LogoHolder = styled.div`
  width: 98%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-left: 1%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AllegianceLogo = styled.img`
  border-color: black;
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
  flex: 0 0 auto;
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
`;

export default MyAllegiances;
