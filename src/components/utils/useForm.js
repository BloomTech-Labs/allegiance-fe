import React, { useState } from "react";
import { Button, Message, Segment, Form, Modal, Icon } from "semantic-ui-react"
import styled from "styled-components"
import useImageUploader from "../utils/useImageUploader";
import Default from "../../assets/walter-avi.png"

const useForm = callback => {
	const [values, setValues] = useState({});
	const [isLoading, setLoading] = useState();
	const [isError, setError] = useState();

	//Imports image upload functions
	const { image, UploaderUI, modalOpen, setModal } = useImageUploader()

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

	//Creates a standard form. Send props for inputs. Any input placed in nameHolder appears at the top next to the image. inputs is the standard form and appear between the image and submit.
	const FormPage = props => {
		return (
			<FormHolder>
				<FormSegment raised color="violet" style={{ margin: 'auto' }}>
					<Form onSubmit={handleSubmit} error>
						<BasicInfoHolder>
							<UploadIcon name='edit' size='large' color='black' onClick={() => setModal(true)} />
							<Modal
								open={modalOpen}
								onClose={() => setModal(false)}
								trigger={<ProfilePic onClick={() => setModal(true)} src={image || values.image || Default} />}>
								<UploaderUI displayImage={image || values.image} />
							</Modal>
							{props.nameHolder &&
								<NameHolder>
									{props.nameHolder}
								</NameHolder>}
						</BasicInfoHolder>
						{props.inputs}
						<ErrorMessage />
						<SubmitButton />
					</Form>
				</FormSegment>
			</FormHolder>
		)
	}

	return {
		handleChange,
		handleSubmit,
		setValues,
		values,
		SubmitButton,
		ErrorMessage,
		FormPage
	};
};

const FormHolder = styled.div`
background-color: #dee4e7;
min-height: 90vh;
padding-top: 5%;
margin-top: -1.5%;
@media (max-width: 320px) {
	height: 87vh
}`

const FormSegment = styled(Segment)`
width: 90%;
margin: auto;
marginBottom: 15%;
`

const UploadIcon = styled(Icon)`
position: absolute;
top: 2.8rem;
left: 2.8rem`

const ProfilePic = styled.img`
border-color: black;
object-fit: cover;
width: 100px;
height: 100px;
border-radius: 50%;
border: 1px solid black;
flex: 0 0 auto;
opacity: .6; `

const BasicInfoHolder = styled.div`
display: flex;
flex-direction: row;`

const NameHolder = styled.div`
display: flex;
flex-direction: column;
justify-content: space - evenly;
margin-left: 7px;
margin-bottom: 1rem;
`

export default useForm;
