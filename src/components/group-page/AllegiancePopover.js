import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	root: {
		height: 40
	},
	avatar: {
		margin: 3,
		marginRight: 0,
		width: 60,
		height: 60,
		marginBottom: 2
	},
	container: {
		display: "flex"
	},
	typography: {
		fontSize: 14,
		color: "black",
		display: "flex",
		zIndex: 1,
		margin: 0
	},
	paper: {
		margin: theme.spacing(1),
		display: "flex",
		zIndex: 1
	}
}));

const SimpleGrow = props => {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(false);

	function handleChange() {
		setChecked(prev => !prev);
	}

	return (
		<div className={classes.root}>
			<FormControlLabel
				control={<ArrowDropDownIcon checked={checked} onClick={handleChange} />}
				label="Allegiances"
			/>
			<div className={classes.container}>
				<Grow in={checked}>
					{props.allegiances.length > 0 ? (
						<Paper elevation={4} className={classes.paper}>
							{props.allegiances.map(al => (
								<Avatar key={al.id} src={al.image} className={classes.avatar} />
							))}
						</Paper>
					) : (
						<Typography
							className={classes.typography}
							variant="body1"
							color="textSecondary"
							component="p"
						>
							No Allegiances Yet!
						</Typography>
					)}
				</Grow>
			</div>
		</div>
	);
};

export default SimpleGrow;
