import React from "react";
import { Link } from "react-router-dom";

import Moment from "react-moment";

import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
	card: {
		width: "80%",
		marginTop: 15,
		marginBottom: 15
	},
	avatar: {
		marginRight: 15,
		marginLeft: 15
	},
	headerAvatar: {
		marginRight: 4,
		marginLeft: 0,
		height: 20,
		width: 20
	},
	button: {
		color: "white",
		backgroundColor: "#1B4570"
	},
	content: {
		color: "black",
		fontSize: 18
	},
	groupAvatar: {
		marginRight: 15,
		marginLeft: 0,
		height: 20,
		width: 20
	}
});

const ContentFeedCard = props => {
	const classes = useStyles();

	// Destructure props to gain access to keys
	const {
		// note: various other key/value pairs available, see postman documentation
		id,
		group_id,
		post_id,
		post_content,
		reply_content,
		created_at,
		first_name,
		last_name,
		user_image,
		tag,
		group_image,
		acronym
	} = props.activity;

	// Combine first and last name into a single variable
	const fullName =
		first_name && last_name
			? first_name.charAt(0).toUpperCase() +
			  first_name.slice(1) +
			  " " +
			  last_name.charAt(0).toUpperCase() +
			  last_name.slice(1)
			: null;

	// defining post id for conditional render
	let postId;
	if (tag === "post") {
		postId = id;
	}
	if (tag === "reply") {
		postId = post_id;
	}
	return (
		<CardDiv>
			<Card className={classes.card}>
				<HeaderDiv>
					<HeaderIcon>
						<SmsOutlinedIcon className={classes.avatar} />
					</HeaderIcon>
					<HeaderContent>
						<Avatar className={classes.headerAvatar} src={user_image} />
						<p>
							{fullName} {tag === "post" && "created a post..."}
							{tag === "reply" && "replied..."}
						</p>
					</HeaderContent>
					<HeaderTimeStamp>
						<Tooltip title={<Moment format="LLLL">{created_at}</Moment>}>
							<Moment fromNow>{created_at}</Moment>
						</Tooltip>
					</HeaderTimeStamp>
				</HeaderDiv>

				<CardActionArea>
					<CardContent>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className={classes.content}
						>
							{tag === "post" && post_content}
							{tag === "reply" && reply_content}
						</Typography>
					</CardContent>
				</CardActionArea>
				<Footer>
					<Link
						to={{
							pathname: `/post/${postId}`,
							replyNumber: tag === "reply" ? id : null
						}}
					>
						<Button variant="contained" size="small" className={classes.button}>
							{tag === "post" && "See Post"} {tag === "reply" && "See Reply"}
						</Button>
					</Link>
					<Link to={`/group/${group_id}`}>
						<GroupFooter>
							<Avatar
								aria-label="recipe"
								className={classes.groupAvatar}
								src={group_image}
							/>
							<p>{acronym}</p>
						</GroupFooter>
					</Link>
				</Footer>
			</Card>
		</CardDiv>
	);
};

const CardDiv = styled.div`
	display: flex;
	justify-content: center;
`;

const HeaderDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	padding: 0.4rem 0;
	text-align: left;
	p {
		color: gray;
	}
`;

const HeaderIcon = styled.div`
	width: 15%;
`;

const HeaderContent = styled.div`
	width: 67%;
	display: flex;
	margin-right: 2%;
	overflow: hidden;
`;

const HeaderTimeStamp = styled.div`
	width: 18%;
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 6% 2% 4%;
`;

const GroupFooter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	p {
		color: black;
	}
`;

export default ContentFeedCard;
