import React from "react";
import styled from "styled-components";
import replies from "../../assets/replies.png";
import LockIcon from "@material-ui/icons/Lock";

const BlockedView = props => {
  return (
    <BlockedContainer>
      <Content>
        <LockIcon style={{ fontSize: 60 }} />
        <h2>You must be a member of this group to see the content!</h2>
      </Content>
    </BlockedContainer>
  );
};

const BlockedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: url(${replies}) !important;
  background-size: cover;
  overflow: hidden;
  position: absolute;
  height: 47vh;
  bottom: 169px;
`;

const Content = styled.div`
  padding-top: 5vh;
  width: 80%;
  position: relative;
  z-index: 1;
`;

export default BlockedView;
