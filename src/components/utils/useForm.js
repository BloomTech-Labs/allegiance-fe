import React, { useState } from "react";
import { Button, Message } from "semantic-ui-react"


const useForm = callback => {
	const [values, setValues] = useState({});
	const [isLoading, setLoading] = useState();
	const [isError, setError] = useState();

	const handleSubmit = event => {
		if (event) event.preventDefault();
		try {
			setLoading(true)
			setError(false)
			callback();
		}
		catch {
			setLoading(false)
			setError(true)
		}
	};

	const handleChange = event => {
		event.persist();
		setValues(values => ({
			...values,
			[event.target.name]: event.target.value
		}));
	};

	const SubmitButton = () => {
		return isLoading
			? <Button loading color="violet">Submit</Button>
			: <Button type="submit" color="violet">Submit</Button>
	}

	const ErrorMessage = () => {
		return isError
			? <Message
				error
				header="Failed to submit form"
				content="Please make sure all fields are filled out accurately." />
			: null
	}

	return {
		handleChange,
		handleSubmit,
		setValues,
		values,
		SubmitButton,
		ErrorMessage
	};
};


export default useForm;
