import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import avi from "../../assets/walter-avi.png";
import Moment from "react-moment";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Favorite,
  ModeCommentOutlined,
  DeleteOutline,
  FavoriteBorder
} from "@material-ui/icons";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";

import { useSelector } from "react-redux";

export default function PostCard(props) {
  const {
    first_name,
    last_name,
    image,
    id,
    post_content,
    user_id,
    likes,
    replies,
    created_at,
    group_id
  } = props.post;
  const userId = useSelector(state => state.userReducer.loggedInUser.id);
  // Obtaining the current users status within the current group
  const userGroups = useSelector(state => state.userReducer.loggedInGroups);
  const userStatus =
    userGroups.filter(group => group.id === group_id).length > 0
      ? userGroups.filter(group => group.id === group_id)[0].user_type
      : null;

  const [token] = useGetToken();
  const postLikeId = likes.find(like => like.user_id === userId);

  const primary = red[600];
  const useStyles = makeStyles(theme => ({
    card: {
      width: 400,
      marginBottom: 20
    },
    cardHeader: {
      padding: 0,
      borderBottom: "1px solid lightgray"
    },
    postActivity: {
      justifyContent: "space-between",
      borderTop: "1px solid lightgray",
      padding: 0,
      paddingLeft: 10,
      paddingRight: 20,
      alignItems: "center"
    },
    title: {
      fontSize: 14,
      fontWeight: "bold"
    },

    avatar: {
      margin: 3,
      marginRight: 0,
      width: 60,
      height: 60,
      marginBottom: 2
    },
    typography: {
      fontSize: 20,
      color: "black"
    },
    buttonDiv: {
      paddingRight: 1,
      paddingBottom: 3
    },
    likedIcon: {
      margin: 0,
      marginBottom: 3,
      padding: 1,
      color: primary,
      paddingRight: 0
    },
    unlikedIcon: {
      margin: 0,
      marginBottom: 3,
      padding: 1,
      color: primary,
      paddingRight: 0
    },
    likesCount: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 4,
      marginBottom: 1
    },
    countIcon: {
      margin: 0,
      marginBottom: 3,
      padding: 1
    }
  }));

  const classes = useStyles();

  const deletePost = async () => {
    const post = await axiosWithAuth([token]).delete(`/posts/${id}`);
    if (post) {
      props.setSubmitted(true);
    }
  };

  async function addLike(e) {
    e.preventDefault();
    const like = await axiosWithAuth([token]).post(`/posts_likes/post/${id}`, {
      user_id: userId,
      post_id: id
    });
    if (like.data.likeResult) {
      props.setSubmitted(true);
    }
  }

  async function unLike(e) {
    e.preventDefault();
    const unLike = await axiosWithAuth([token]).delete(
      `/posts_likes/${postLikeId.id}`
    );
    if (unLike) {
      props.setSubmitted(true);
    }
  }

  return (
    <Card raised className={classes.card}>
      <CardHeader
        classes={{
          title: classes.title,
          avatar: classes.avatar
        }}
        className={classes.cardHeader}
        avatar={
          <Avatar src={!image ? avi : image} className={classes.avatar} />
        }
        action={
          (userId === user_id || userStatus === "admin") &&
          !window.location.pathname.includes("/post") && (
            <IconButton onClick={() => deletePost()} aria-label="settings">
              <DeleteOutline />
            </IconButton>
          )
        }
        title={`${first_name} ${last_name}`}
        titleTypographyProps={{ fontSize: 25 }}
        subheader={
          <Tooltip title={<Moment format="LLLL">{created_at}</Moment>}>
            <Moment fromNow>{created_at}</Moment>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography
          className={classes.typography}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {post_content}
        </Typography>
      </CardContent>
      <CardActions className={classes.postActivity} disableSpacing>
        {!postLikeId && (
          <div>
            <IconButton
              className={classes.buttonDiv}
              aria-label="add to favorites"
              onClick={addLike}
            >
              <FavoriteBorder className={classes.unlikedIcon} />
            </IconButton>
            <IconButton className={classes.likesCount}>
              <h4 className="likes-count"> {likes.length} </h4>
            </IconButton>
          </div>
        )}
        {postLikeId && (
          <div>
            <IconButton
              className={classes.buttonDiv}
              aria-label="add to favorites"
              onClick={unLike}
            >
              <Favorite className={classes.likedIcon} />
            </IconButton>
            <IconButton className={classes.likesCount}>
              <h4 className="likes-count"> {likes.length} </h4>
            </IconButton>
          </div>
        )}
        <div>
          <Link to={`/post/${id}`}>
            <IconButton aria-label="share" className={classes.buttonDiv}>
              <ModeCommentOutlined />
            </IconButton>
            <IconButton className={classes.likesCount}>
              <h4> {replies.length} </h4>
            </IconButton>
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}
