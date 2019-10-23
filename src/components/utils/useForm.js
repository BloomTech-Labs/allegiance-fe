import React, { useState } from 'react'
import { Button, Message } from 'semantic-ui-react'

const useForm = callback => {
  const [values, setValues] = useState({})
  const [isLoading, setLoading] = useState()
  const [isError, setError] = useState()
  const [errorContent, setErrorContent] = useState()

  const handleSubmit = event => {
    if (event) event.preventDefault()
    try {
      setLoading(true)
      setError(false)
      setErrorContent(null)
      callback()
      setValues('')
    } catch {}
  }

  const handleChange = event => {
    console.log("event.target.name", event.target.name)
    event.persist()
    setError(false)
    setErrorContent(null)
    setValues(values => {
      console.log('values', values)
      return {
        ...values,
      [event.target.name]: event.target.value,
      } 
    })
  }

  const SubmitButton = () => {
    return isLoading ? (
      <Button loading color='violet'>
        Submit
      </Button>
    ) : (
      <Button type='submit' color='violet'>
        Submit
      </Button>
    )
  }

  const ErrorMessage = () => {
    return isError ? (
      <Message
        error
        header='Failed to submit form'
        content={
          errorContent ||
          'Please make sure all fields are filled out accurately.'
        }
      />
    ) : null
  }

  return {
    handleChange,
    handleSubmit,
    setValues,
    values,
    SubmitButton,
    ErrorMessage,
    setError,
    setErrorContent,
    setLoading,
  }
}

export default useForm
