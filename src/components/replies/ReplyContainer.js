import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VIEW_REPLIES } from "../../reducers/navReducer";

import styled from "styled-components";
import "../../styled/Replies.scss";
import { Loader } from "semantic-ui-react";
import { green } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";

import PostCard from "../posts/PostCard";
import ReplyCard from "./ReplyCard";

const ReplyContainer = props => {
  const [post, setPost] = useState();
  const [submitted, setSubmitted] = useState(false);
  const id = props.match.params.id;

  const userId = useSelector(state => state.userReducer.loggedInUser.id);
  const dispatch = useDispatch();

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
        try {
          const response = await axiosWithAuth([token]).get(`/posts/${id}`);
          setPost(response.data.postLoaded);
          const groupId = response.data.postLoaded.group_id;
          setSubmitted(false);
          dispatch({ type: VIEW_REPLIES, payload: groupId });
        } catch {
          dispatch({ type: VIEW_REPLIES, payload: 0 });
        }
      }
    };
    fetchData();
  }, [token, id, submitted, dispatch]);

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
  const primary = green[500];
  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: "white"
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 200
    },
    margin: {
      margin: theme.spacing(1)
    },
    avatar: {
      margin: 3,
      width: 60,
      height: 60
    },
    typography: {
      fontSize: 13,
      color: "black",
      padding: 0
    },
    typography2: {
      fontSize: 15,
      color: "black",
      fontWeight: "bold"
    },
    root: {
      background: primary,
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  if (!post) {
    return (
      <Loader active size="large">
        Loading
      </Loader>
    );
  }

  const sortedReplies = post.replies.sort((a, b) => a.id - b.id);

  return (
    <ReplyViewContainer>
      <PostCard post={post} setSubmitted={setSubmitted} />

      <ReplyCardsContainer>
        {sortedReplies.map(reply => {
          return (
            <ReplyCard
              reply={reply}
              setSubmitted={setSubmitted}
              key={reply.id}
              post={post}
            />
          );
        })}
      </ReplyCardsContainer>

      <form className={"reply-form"} onSubmit={handleSubmit}>
        <div className={"input-div"}>
          <TextField
            id="outlined-textarea"
            required
            label="Reply to post"
            placeholder="Reply..."
            multiline
            fullWidth
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            name="reply_content"
            value={values.reply_content || ""}
          />
        </div>
        <Fab classes={{ root: classes.root }} type="submit" aria-label="Reply">
          <AddIcon />
        </Fab>
      </form>
    </ReplyViewContainer>
  );
};

const ReplyViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dee4e7;
  min-height: 87vh;
  justify-content: flex-start;
`;
const ReplyCardsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 18%;
`;

export default ReplyContainer;
