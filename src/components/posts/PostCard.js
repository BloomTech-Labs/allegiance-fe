import React from "react";
import { useSelector } from "react-redux";
import { Icon, Image } from "semantic-ui-react";

import styled from "styled-components";
import PostActivity from "./PostActivity";

const PostCard = props => {
  const { first_name, last_name, image, id } = useSelector(
    state => state.userReducer.loggedInUser
  );

  return (
    <CardContainer>
      <Image src={image} avatar />
      <BubbleContainer>
        <PostMember>
          {first_name} {last_name}
        </PostMember>
        <PostBubble
          className={props.post.user_id === id ? "my-post" : "your-post"}
        >
          <p>{props.post.post_content}</p>
        </PostBubble>
      </BubbleContainer>
      <PostActivity post={props.post} />

      <Icon
        name="trash alternate"
        color="red"
        onClick={() => props.deletePost(props.post.id)}
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  //   display: flex;
  //   flex-direction: row;
  //   max-width: 80%;
`;

const BubbleContainer = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   max-width: 100%;
`;

const PostMember = styled.div`
  font-size: 1rem;
  color: black;
`;

const PostBubble = styled.div`
  background: #efefef;
  -webkit-border-radius: 4px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bolder;
  line-height: 1.3;
  //   margin: 0 auto 5%;
  max-width: 80%;
  position: relative;
  &.my-post {
    background-color: #3480f1;
    color: white;
    &:after {
      border-radius: 0 0 0 100%;
      content: "";
      position: absolute;
      bottom: -3px;
      right: 0px;
      width: 9px;
      height: 13px;
      background-color: #3480f1;
    }
  }
  &.your-post {
    color: black;
    background-color: #ff5722;
    &:before {
      border-radius: 0 0 100% 0;
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0px;
      width: 9px;
      height: 13px;
      background-color: #ff5722;
    }
  }

  p {
    font-size: 0.8rem;
    line-height: 1.2rem;
    margin: 1% 0;
    padding: 3% 7% 3% 6%;
    position: relative;
    &:after {
      position: absolute;
      content: "";
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: -1;
    }
  }
`;

export default PostCard;
