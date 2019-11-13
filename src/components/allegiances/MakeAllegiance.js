import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Icon, Modal, Segment } from 'semantic-ui-react'

import { axiosWithAuth } from '../utils/axiosWithAuth'
import useGetToken from '../utils/useGetToken'
import useForm from '../utils/useForm'
import useImageUploader from '../utils/useImageUploader'
// import { ADD_ALLEGIANCE } from '../../reducers/userReducer'
import * as types from 'actions/actionTypes'
import styled from 'styled-components'
import Default from '../../assets/walter-avi.png'

const MakeAllegiance = props => {
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
    SubmitButton,
    ErrorMessage,
    setError,
    setLoading,
  } = useForm(createAllegiance)

  //Imports image upload functions
  const { image, UploaderUI, modalOpen, setModal } = useImageUploader()

  const addAllegiance = async allegiance => {
    try {
      const userAllegiance = await axiosWithAuth([token]).post(
        `/users_allegiances/`,
        {
          user_id: loggedInUser.id,
          allegiance_id: allegiance.id,
        }
      )
      const {
        allegiance_id,
        allegiance_name,
        allegiance_image,
      } = userAllegiance.data.newUserAllegiances
      const newAllegiance = {
        id: allegiance_id,
        name: allegiance_name,
        image: allegiance_image,
      }
      dispatch({ type: types.ADD_ALLEGIANCES_SUCCESS, payload: newAllegiance })
      const push = () => props.history.push('/profile')

      setTimeout(push, 1000)
    } catch {
      dispatch({ type: types.ADD_ALLEGIANCES_FAILURE })
      setError(true)
      setLoading(false)
    }
  }

  async function createAllegiance() {
    try {
      // Checks if user provided an image; uses default image if not
      values.image = image ? image : Default
      // If user doesn't interact with sport dropdown, supplies Other value
      values.sport = values.sport ? values.sport : 'Other'
      const result = await axiosWithAuth([token]).post(`/allegiances`, values)
      addAllegiance(result.data.newAllegiance)
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <FormHolder>
      <FormSegment raised color='violet' style={{ margin: 'auto' }}>
        <Form onSubmit={handleSubmit} error>
          <BasicInfoHolder>
            <UploadIcon
              name='edit'
              size='large'
              color='black'
              onClick={() => setModal(true)}
            />
            <Modal
              open={modalOpen}
              onClose={() => setModal(false)}
              trigger={
                <ProfilePic
                  alt={'Image Preview'}
                  onClick={() => setModal(true)}
                  src={image || values.image || Default}
                />
              }
            >
              <UploaderUI displayImage={image || values.image} />
            </Modal>
          </BasicInfoHolder>
          <Form.Input
            required
            label='Allegiance Name'
            placeholder='Allegiance Name'
            onChange={handleChange}
            value={values.allegiance_name || ''}
            name='allegiance_name'
            type='text'
          />
          <Form.Field
            required
            label='Sport'
            onChange={handleChange}
            value={values.sport || ''}
            name='sport'
            control='select'
          >
            <option value='Other'>Other</option>
            <option value='NFL'>NFL</option>
            <option value='MLB'>MLB</option>
            <option value='NBA'>NBA</option>
            <option value='NHL'>NHL</option>
          </Form.Field>
          <ErrorMessage />
          <SubmitButton />
        </Form>
      </FormSegment>
    </FormHolder>
  )
}
const FormHolder = styled.div`
  background-color: #e8edf1;
  min-height: 90vh;
  @media (max-width: 320px) {
    height: 87vh;
  }
`

const FormSegment = styled(Segment)`
  width: 90%;
  margin: auto;
  marginbottom: 15%;
`

const UploadIcon = styled(Icon)`
  position: absolute;
  top: 2.8rem;
  left: 2.8rem;
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
  flex-direction: row;
`
export default MakeAllegiance
