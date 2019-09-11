import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import MatUiPostCard from "../posts/MatUiPostCard";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";

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
    },
    avatar: {
      margin: 3,
      width: 60,
      height: 60
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
  console.log("POST", post);
  return (
    <>
      <MatUiPostCard post={post} />

      <RepliesList>
        <ReplyCard>
          {post.replies.map(reply => {
            let bubbleClass = "you";
            let bubbleDirection = "";

            // if (userId === post.user_id) {
            //   bubbleClass = "me";
            //   bubbleDirection = "bubble-direction-reverse";
            // }
            return (
              <div>
                <BubbleContainer
                  className={"bubble-container"}
                  className={
                    userId === post.user_id ? "bubble-direction-reverse" : ""
                  }
                  key={post.id}
                >
                  <div
                    className={"bubble"}
                    className={userId === post.user_id ? "me" : "you"}
                  >
                    {reply.reply_content}
                  </div>
                  <Avatar className={classes.avatar} src={post.image} />
                </BubbleContainer>
              </div>
            );
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

const BubbleContainer = styled.div`
  // margin-top: 8px;
  // margin-bottom: 8px;
  // display:flex;
  // font-family: sans-serif;
  // font-size: 14px;
  // align-items: center;
  // &.bubble-direction-reverse {
  //     flex-direction: row-reverse;
  //   }
  // &.me {
  //     background-color: #8f5db7;
  //     margin-left: 18px;
  //     margin-right:60px;
  //     &&:before {
  //         box-shadow: -2px 2px 2px 0 rgba( 178, 178, 178, .4 );
  //         left: -9px;
  //         background-color: #8f5db7;
  //     }
  // }
  // &.you {
  //     background-color: #087FFE;
  //     margin-left: 60px;
  //     margin-right:18px;
  //     &&:before {
  //         box-shadow: 2px -2px 2px 0 rgba( 178, 178, 178, .4 );
  //         right: -9px;
  //         background-color: #087FFE;

  // }
  // &.bubble{
  //     background-color: #F2F2F2;
  //     border-radius: 5px;
  //     box-shadow: 0 0 6px #B2B2B2;
  //     display: block;
  //     padding: 10px 18px;
  //     position: relative;
  //     vertical-align: top;
  //     color: white;
  //     word-wrap: break-word;
  //     &&:before {
  //         background-color: #F2F2F2;
  //         content: "\00a0";
  //         display: block;
  //         height: 16px;
  //         position: absolute;
  //         top: 11px;
  //         transform:             rotate( 29deg ) skew( -35deg );
  //             -moz-transform:    rotate( 29deg ) skew( -35deg );
  //             -ms-transform:     rotate( 29deg ) skew( -35deg );
  //             -o-transform:      rotate( 29deg ) skew( -35deg );
  //             -webkit-transform: rotate( 29deg ) skew( -35deg );
  //         width:  20px;
  //     }
  // }
`;

const ReplyCard = styled.div``;

export default ReplyContainer;
