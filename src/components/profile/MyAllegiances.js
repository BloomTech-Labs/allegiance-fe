import React from "react";
import { Popup, Icon } from "semantic-ui-react";
import styled from "styled-components";

const MyAllegiances = props => {
  console.log(props);
  return (
    <LogoHolder>
      {props.content.map(allegiance => (
        <div key={allegiance.id} style={{ margin: "1% 2% 2%" }}>
          <Popup
            content={allegiance.name}
            trigger={<AllegianceLogo src={allegiance.image} />}
          />
        </div>
      ))}
    </LogoHolder>
  );
};

const LogoHolder = styled.div`
  width: 98%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
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
