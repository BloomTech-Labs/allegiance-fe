import React from "react";

import { useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import useForm from "../utils/useForm";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";

import "../../styled/Replies.scss";

const PostForm = props => {
	const primary = green[500];
	// token for accessing authentication required backend routes
	const [token] = useGetToken();

	const userId = useSelector(state => state.userReducer.loggedInUser.id);
	// useForm custom hook and set timeout custom hook
	const { values, setValues, handleChange, handleSubmit } = useForm(submitPost);

	// callback function to handle submit
	async function submitPost(e) {
		const post = await axiosWithAuth([token]).post(
			`/posts/group/${props.groupId}`,
			{
				user_id: userId,
				group_id: props.groupId,
				post_content: values.post_content
			}
		);
		if (post.data.postResult) {
			setValues("");
			props.setSubmitted(true);
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
			marginRight: theme.spacing(1),
			backgroundColor: "white"
		},

		margin: {
			margin: theme.spacing(1)
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

	return (
		<form className={"reply-form"} onSubmit={handleSubmit}>
			<div className={"input-div"}>
				<TextField
					id="outlined-textarea"
					required
					label="Post"
					placeholder="Write a post to the group..."
					multiline
					fullWidth
					className={classes.textField}
					margin="normal"
					variant="outlined"
					onChange={handleChange}
					name="post_content"
					value={values.post_content || ""}
				/>
			</div>
			<Fab classes={{ root: classes.root }} type="submit" aria-label="Reply">
				<AddIcon />
			</Fab>
		</form>
	);
};

// const FormContainer = styled(Form)`
//   margin-top: 5vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

export default PostForm;
