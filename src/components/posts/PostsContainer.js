import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import PostCard from "./PostCard";
import PostForm from "./PostForm";

import styled from "styled-components";

const PostsContainer = props => {
  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  const loggedInPosts = useSelector(state => state.userReducer.loggedInPosts);
  const [posts, setPosts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id = props.groupId;
      if (token) {
        const posts = await axiosWithAuth([token]).get(`/posts/group/${id}`);
        console.log("%c Posts List", "color: orange; font-weight: bold;");
        console.log(posts.data);
        setPosts(posts.data.posts);
        setSubmitted(false);
      }
    };

    fetchData();
  }, [token, submitted]);

  const deletePost = async postId => {
    const post = await axiosWithAuth([token]).delete(`/posts/${postId}`);
    if (post) {
      setSubmitted(true);
    }
  };
  return (
    <PostsWrapper>
      <PostListContainer>
        {posts.map(post => {
          return <PostCard post={post} key={post.id} deletePost={deletePost} />;
        })}
      </PostListContainer>

      <PostForm
        submitted={submitted}
        setSubmitted={setSubmitted}
        groupId={props.groupId}
      />
    </PostsWrapper>
  );
};

const PostListContainer = styled.div``;
const PostsWrapper = styled.div``;

export default PostsContainer;
