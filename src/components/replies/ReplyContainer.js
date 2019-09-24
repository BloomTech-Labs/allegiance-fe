import React, { useState, useEffect, useRef, createRef } from "react";
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
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";

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
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			backgroundColor: "white"
		},
		root: {
			background: primary,
			margin: theme.spacing(1)
		},
		button: {
			marginTop: 10,
			height: 30,
			width: 30
		}
	}));

	const classes = useStyles();

	// CreateRef for scrolling from Links
	const replyRefs = post
		? post.replies.reduce((acc, value) => {
				acc[value.id] = createRef();
				return acc;
		  }, {})
		: null;

	// On component mount, if a replyNumber is received from props, scroll the reply into view
	useEffect(
		() => {
			if (props.location.replyNumber && replyRefs !== null) {
				let yCoordinate;
				const scrollRef = () => {
					// Subtract 50 px to account for padding top from top nav bar
					const yOffset = -50;
					window.scrollTo({
						top: yCoordinate + yOffset,
						behavior: "smooth"
					});
				};

				// Position of reply using replyNumber from props
				yCoordinate =
					replyRefs[props.location.replyNumber].current.getBoundingClientRect()
						.top + window.pageYOffset;

				scrollRef();
				props.location.replyNumber = null;
			}
		}
		// No dependency array included as scrollRef render should only occur once (upon navigation from feed or notification)
	);

	// Create ref and scrollToBottom function to allow scroll to bottom
	const repliesEndRef = useRef(null);

	const scrollToBottom = () => {
		if (repliesEndRef.current) {
			repliesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

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
						<div ref={replyRefs[reply.id]} key={reply.id}>
							<ReplyCard
								reply={reply}
								setSubmitted={setSubmitted}
								post={post}
							/>
						</div>
					);
				})}
			</ReplyCardsContainer>

			<div ref={repliesEndRef} />

			<ContainerBottom>
				<DownNav>
					<VerticalAlignBottomIcon
						className={classes.button}
						onClick={scrollToBottom}
					/>
				</DownNav>
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
					<Fab
						classes={{ root: classes.root }}
						type="submit"
						aria-label="Reply"
					>
						<AddIcon />
					</Fab>
				</form>
			</ContainerBottom>
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
const ContainerBottom = styled.div`
	display: flex;
	position: fixed;
	bottom: 6.5%;
	width: 100%;
	align-items: center;
	justify-content: center;
	background-color: #dee4e7;
`;
const DownNav = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 10%;
`;

export default ReplyContainer;
