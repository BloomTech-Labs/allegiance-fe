import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import MatUiPostCard from "../posts/MatUiPostCard";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";

const ReplyContainer = props => {
  const [post, setPost] = useState();
  const [submitted, setSubmitted] = useState(false);
  const id = props.match.params.id;
  const userId = useSelector(state => state.userReducer.loggedInUser.id);
  console.log(id);
  // useForm custom hook and set timeout custom hook
  const { values, setValues, handleChange, handleSubmit } = useForm(
    submitReply
  );
  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  useEffect(() => {
    // Fetch group related data
    const fetchData = async () => {
      if (token) {
        const response = await axiosWithAuth([token]).get(`/posts/${id}`);
        setPost(response.data.postLoaded);
        console.log("data:", response.data.postLoaded);
      }
    };
    fetchData();
  }, [token, id, submitted]);

  // callback function to handle submit
  async function submitReply(e) {
    const post = await axiosWithAuth([token]).post(`/replies/post/${id}`, {
      user_id: userId,
      post_id: id,
      reply_content: values.reply_content
    });
    if (post.data.reply) {
      setValues("");
      setSubmitted(true);
    }
  }

  // Material UI
  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 200
    },
    margin: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  console.log(post);
  if (!post) {
    return (
      <Loader active size="large">
        Loading
      </Loader>
    );
  }
  return (
    <>
      <MatUiPostCard post={post} />

      <RepliesList>
        <ReplyCard>
          {post.replies.map(reply => {
            return <>{reply.reply_content}</>;
          })}
        </ReplyCard>
      </RepliesList>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-textarea"
          label="Reply to post"
          placeholder="Reply..."
          multiline
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          name="reply_content"
          value={values.reply_content || ""}
        />
        <Fab type="submit" aria-label="Reply" className={classes.margin}>
          <AddIcon />
        </Fab>
      </form>
    </>
  );
};

const RepliesList = styled.div``;

const ReplyCard = styled.div``;

export default ReplyContainer;
