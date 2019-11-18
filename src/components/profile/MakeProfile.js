import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as types from 'actions/actionTypes'
import useForm from '../utils/useForm'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import useImageUploader from '../utils/useImageUploader'
import { Form, Modal, Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import Default from '../../assets/walter-avi.png'

const MakeProfile = props => {
  //Fetches logged in user's info from redux store.
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
  const dispatch = useDispatch()

  //Fetches Auth0 token for axios call
  const [token] = useGetToken()

  //Imports form custom hook to handle state, form entry and form submission.
  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    SubmitButton,
    ErrorMessage,
    setError,
    setErrorContent,
    setLoading,
  } = useForm(updateUser, true)

  //Imports image upload functions
  const { image, UploaderUI, modalOpen, setModal } = useImageUploader()

  //Sends user data as a put request to API to update user info.
  async function updateUser() {
    try {
      dispatch({ type: types.UPDATE_USER_REQUEST })
      if (image) values.image = image
      Object.keys(values).forEach(key => {
        const val = values[key]
        if (val === '' || !val) {
          values[key] = null
        } else {
          values[key] = val.replace(/\s\s+/g, ' ').trim()
        }
      })

      const users = await axiosWithAuth([token]).get(`/users`)

      const emailExists = users.data.users.some(
        user => user.email === values.email && loggedInUser.id !== user.id
      )
      if (emailExists) {
        setErrorContent('Email is in use by a different account')
        throw new Error()
      }

      const usernameExists = users.data.users.some(
        user => user.username === values.username && loggedInUser.id !== user.id
      )
      if (usernameExists) {
        setErrorContent('Username is in use by a different account')
        throw new Error()
      }

      const result = await axiosWithAuth([token]).put(
        `/users/${loggedInUser.id}`,
        values
      )
      dispatch({
        type: types.UPDATE_USER_SUCCESS,
        payload: result.data.updated,
      })
      // Mixpanel.activity(loggedInUser.id, 'Complete Edit Profile')
      const push = () => props.history.push(`/profile/${loggedInUser.id}`)
      setTimeout(push, 1000)
    } catch (err) {
      dispatch({ type: types.UPDATE_USER_FAILURE, payload: err })
      // Mixpanel.activity(loggedInUser.id, 'Edit Profile Failed')
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    //Separates user id from user info and then sets the value of each field to the logged in user's info. This auto fills the form fields allowing user's to easily see their current info and enter slight changes without needing to re-enter the entire field.
    let { id, ...userInfo } = loggedInUser
    setValues(userInfo)
    // Mixpanel.activity(loggedInUser.id, 'Start Edit Profile')
  }, [setValues, loggedInUser])

  return (
    <FormHolder>
      <FormSegment style={{ margin: 'auto' }}>
        <Form onSubmit={handleSubmit} error style={{ fontSize: '1.5rem' }}>
          <h4 style={{ fontWeight: 'bold' }}>Select Image</h4>
          <BasicInfoHolder>
            <Modal
              open={modalOpen}
              onClose={() => setModal(false)}
              trigger={
                <ProfilePic
                  onClick={() => setModal(true)}
                  src={image || values.image || Default}
                  alt={'Image Preview'}
                />
              }
            >
              <UploaderUI displayImage={image || values.image} />
            </Modal>
          </BasicInfoHolder>
          <FieldHolder>
            <ColumnHolder>
              <Form.Group widths='equal'>
                <Form.Input
                  required
                  label='First Name'
                  placeholder='First Name'
                  onChange={handleChange}
                  value={values.first_name || ''}
                  name='first_name'
                  type='text'
                />
                <Form.Input
                  required
                  label='Last Name'
                  placeholder='Last Name'
                  onChange={handleChange}
                  value={values.last_name || ''}
                  name='last_name'
                  type='text'
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  placeholder='Bio'
                  label='Bio'
                  onChange={handleChange}
                  value={values.bio || ''}
                  name='bio'
                  type='text'
                />

                <Form.Input
                  key={'email'}
                  required
                  label='E-mail Address'
                  placeholder='E-Mail'
                  onChange={handleChange}
                  value={values.email || ''}
                  name='email'
                  type='text'
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  required
                  label='Username'
                  placeholder='Username'
                  onChange={handleChange}
                  value={values.username || ''}
                  name='username'
                  type='text'
                />
                <Form.Input
                  required
                  label='Zip Code'
                  placeholder='Zip Code (To Discover Local Groups)'
                  minLength='5'
                  maxLength='5'
                  onChange={handleChange}
                  value={values.location || ''}
                  name='location'
                  type='text'
                />
              </Form.Group>
              <Form.Input
                label='Banner Image'
                placeholder='Banner Image'
                onChange={handleChange}
                value={values.banner_image || ''}
                name='banner_image'
                type='text'
              />
              <SubmitButton style={StyledButton} />
            </ColumnHolder>
          </FieldHolder>
          <ErrorMessage />
        </Form>
      </FormSegment>
    </FormHolder>
  )
}

// this doesnt change anything, attempting stop button from stretching too big
const StyledButton = {
  borderRadius: 18,
  width: 200,
  marginLeft: 160,
  marginTop: 20,
  backgroundColor: 'green',
  color: 'white',
  maxWidth: '400px',
}

const FormHolder = styled.div`
  justify-content: center;
  @media (max-width: 320px) {
    height: 87vh;
  }
`

const FieldHolder = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

const ColumnHolder = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`

const FormSegment = styled(Segment)`
  margin: auto;
  margin-bottom: 15%;
  max-width: 800px;
`

const ProfilePic = styled.img`
  border-color: black;
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  flex: 0 0 auto;
  opacity: 0.6;
`

const BasicInfoHolder = styled.div`
  display: flex;
  justify-content: center;
`

export default MakeProfile
