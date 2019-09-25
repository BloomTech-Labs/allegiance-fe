import React from "react";
import { useSelector } from "react-redux";

import "../../styled/Replies.scss";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

import avi from "../../assets/walter-avi.png";
import { Favorite, DeleteOutline, FavoriteBorder } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import Moment from "react-moment";
import Tooltip from "@material-ui/core/Tooltip";

const ReplyCard = props => {
  const {
    first_name,
    last_name,
    image,
    id,
    reply_content,
    user_id,
    replyLikes,
    created_at
  } = props.reply;
  const primary = red[600];
  const userId = useSelector(state => state.userReducer.loggedInUser.id);
  const replyLikeId = replyLikes.find(like => like.user_id === userId);
  // Obtaining the current users status within the current group
  const userGroups = useSelector(state => state.userReducer.loggedInGroups);
  const { group_id } = props.post;
  const userStatus =
    userGroups.filter(group => group.id === group_id).length > 0
      ? userGroups.filter(group => group.id === group_id)[0].user_type
      : null;

  // Fetches Auth0 token for axios call
  const [token] = useGetToken();

  // Material UI Styling
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
    likedIcon: {
      margin: 0,
      marginBottom: 0,
      padding: 0,
      color: primary
    },
    unlikedIcon: {
      margin: 0,
      marginBottom: 0,
      padding: 0,
      color: primary
    },
    countIcon: {
      margin: 0,
      marginBottom: 3,
      padding: 0
    },
    icon: {
      margin: 0,
      marginBottom: 0,
      padding: 0
    }
  }));

  const classes = useStyles();
  // Functions for liking & unliking replies
  async function addReplyLike(e) {
    e.preventDefault();
    const like = await axiosWithAuth([token]).post(
      `/replies_likes/reply/${id}`,
      {
        user_id: userId,
        reply_id: id
      }
    );
    if (like.data.likeResult) {
      props.setSubmitted(true);
    }
  }

  async function unLikeReply(e) {
    e.preventDefault();
    const unLike = await axiosWithAuth([token]).delete(
      `/replies_likes/${replyLikeId.id}`
    );
    if (unLike) {
      props.setSubmitted(true);
    }
  }

  const deleteReply = async () => {
    const reply = await axiosWithAuth([token]).delete(`/replies/${id}`);
    if (reply) {
      props.setSubmitted(true);
    }
  };

  return (
    <div className={"reply-div"}>
      <BubbleContainer
        // className={userId === user_id ? "mine" : "yours"}
        user={userId === user_id ? "mine" : "yours"}
        key={id}
      >
        <Avatar className={classes.avatar} src={!image ? avi : image} />
        <Tooltip title={<Moment format="LLLL">{created_at}</Moment>}>
          <Content className={userId === user_id ? "me" : "you"}>
            <Typography
              className={classes.typography2}
              variant="body1"
              color="textPrimary"
              component="p"
            >
              {first_name} {last_name}
            </Typography>
            <Typography
              className={classes.typography}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {reply_content}
            </Typography>
          </Content>
        </Tooltip>
        <Activity>
          {!replyLikeId && (
            <div>
              <IconButton
                className={classes.icon}
                aria-label="add to favorites"
                onClick={addReplyLike}
              >
                <FavoriteBorder className={classes.unlikedIcon} />
              </IconButton>
              <IconButton className={classes.countIcon}>
                <h4> {replyLikes.length} </h4>
              </IconButton>
            </div>
          )}
          {replyLikeId && (
            <div>
              <IconButton
                className={classes.icon}
                aria-label="add to favorites"
                onClick={unLikeReply}
              >
                <Favorite className={classes.likedIcon} />
              </IconButton>
              <IconButton className={classes.countIcon}>
                <h4> {replyLikes.length} </h4>
              </IconButton>
            </div>
          )}

          {(userId === user_id || userStatus === "admin") && (
            <IconButton
              onClick={() => deleteReply()}
              aria-label="settings"
              className={classes.icon}
            >
              <DeleteOutline />
            </IconButton>
          )}
        </Activity>
      </BubbleContainer>
    </div>
  );
};

const BubbleContainer = styled.div`
  display: flex;
  align-items: center;
  &:last-child {
    padding-bottom: 0;
  }
  flex-direction: ${props => {
    return props.user === "mine" ? "row-reverse" : "row";
  }};
  justify-content: ${props => {
    return props.user === "yours" ? "flex-start" : "none";
  }};
`;

const Content = styled(CardContent)`
  max-width: 70%;
  padding: 10px;
  &:last-child {
    padding-bottom: 0;
  }
`;
const Activity = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export default ReplyCard;
