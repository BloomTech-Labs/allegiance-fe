import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import PostForm from "./PostForm";

import styled from "styled-components";
import PostCard from "./PostCard";

const PostsContainer = props => {
  // Fetches Auth0 token for axios call
  const [token] = useGetToken();
  const [posts, setPosts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id = props.groupId;
      if (token)
        try {
          const posts = await axiosWithAuth([token]).get(`/posts/group/${id}`);
          setPosts(posts.data.postsLoaded);
          setSubmitted(false);
        } catch {
          setPosts([]);
          setSubmitted(false);
        }
    };
    fetchData();
  }, [token, submitted, props.groupId]);

  return (
    <PostsWrapper>
      <PostListContainer>
        {posts.map(post => {
          return (
            <PostCard post={post} key={post.id} setSubmitted={setSubmitted} />
          );
        })}
      </PostListContainer>
      <PostForm setSubmitted={setSubmitted} groupId={props.groupId} />
    </PostsWrapper>
  );
};

const PostListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dee4e7;
  padding-bottom: 15%;
`;
const PostsWrapper = styled.div`
  background-color: #dee4e7;
`;

export default PostsContainer;
