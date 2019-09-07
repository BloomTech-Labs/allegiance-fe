import React from "react";
import { useSelector } from "react-redux";
import { Icon, Image } from "semantic-ui-react";

import styled from "styled-components";

const PostCard = props => {
  const { first_name, last_name, image, id } = useSelector(
    state => state.userReducer.loggedInUser
  );

  return (
    <CardContainer>
      <PostMember>
        <Image src={image} avatar />
        {first_name} {last_name}
      </PostMember>
      <PostBubble
        className={props.post.user_id === id ? "my-post" : "your-post"}
      >
        <p>{props.post.post_content}</p>
      </PostBubble>

      <Icon
        name="trash alternate"
        color="red"
        onClick={() => props.deletePost(props.post.id)}
      />
    </CardContainer>
  );
};

const CardContainer = styled.div``;

const PostMember = styled.div``;

const PostBubble = styled.div`
  background: #efefef;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  font-size: 1.2rem;
  line-height: 1.3;
  margin: 0 auto 5%;
  max-width: 50%;
  padding: 3%;
  position: relative;
  &.my-post {
    border: 1px solid red;
  }
  &.your-post {
    border: 1px solid yellow;
  }
  &:after {
    border-left: 20px solid transparent;
    border-top: 20px solid #efefef;
    bottom: -20px;
    content: "";
    position: absolute;
    right: 20px;
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
