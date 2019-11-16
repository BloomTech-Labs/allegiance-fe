import React, { useState } from 'react'
import { Button, Message } from 'semantic-ui-react'

const useForm = (callback, keepValues) => {
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
      if (!keepValues) {
        setValues('')
      }
    } catch {}
  }

  const handleChange = event => {
    event.persist()
    setError(false)
    setErrorContent(null)
    setValues(values => {
      return {
        ...values,
        [event.target.name]: event.target.value,
      }
    })
  }

  const SubmitButton = () => {
    return isLoading ? (
      <Button loading style={{ backgroundColor: '#4483cd', color: 'white' }}>
        Submit
      </Button>
    ) : (
      <Button
        type='submit'
        style={{ backgroundColor: '#4483cd', color: 'white' }}
      >
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
    isLoading,
  }
}

export default useForm
