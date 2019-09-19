import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

const ContentFeedCard = props => {
  const classes = useStyles();
  const {
    id,
    user_id,
    group_name,
    group_id,
    post_id,
    post_content,
    reply_content,
    created_at,
    updated_at,
    first_name,
    last_name,
    image,
    tag
  } = props.activity;
  return (
    <CardDiv>
      {tag === "post" && (
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {first_name} {last_name} created a post...
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post_content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Post
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      )}

      {tag === "reply" && (
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {first_name} {last_name} replied to someone...
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {reply_content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              See Conversation
            </Button>
          </CardActions>
        </Card>
      )}
    </CardDiv>
  );
};

const CardDiv = styled.div``;

export default ContentFeedCard;
