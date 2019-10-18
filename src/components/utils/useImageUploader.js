import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import React from 'react'
import axios from 'axios'
import { Modal, Icon, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import Default from '../../assets/walter-avi.png'

const useImageUploader = type => {
  //Imports form custom hook to handle state, form entry and form submission.
  const [image, setImage] = useState()
  const [banner, setBanner] = useState()
  const [modalOpen, setModal] = useState(false)

  const onDrop = useCallback(
    acceptedFiles => {
      const timestamp = Date.now() / 1000
      let formData = new FormData()
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_APIKEY)
      formData.append('file', acceptedFiles[0])
      formData.append('timestamp', timestamp)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
      const uploadImage = async () => {
        const result = await axios.post(
          process.env.REACT_APP_CLOUDINARY_URL,
          formData
        )
        type === 'banner'
          ? setBanner(result.data.secure_url)
          : setImage(result.data.secure_url)
      }
      uploadImage()
    },
    [type]
  )

  const UploaderUI = props => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    })

    return (
      <UploadModal>
        <Uploader {...getRootProps()}>
          <input {...getInputProps()} />

          <div>
            <Icon name='cloud upload' size='huge' color='violet' inverted />
            {isDragActive ? (
              <DropText>Drop the files here ...</DropText>
            ) : (
              <>
                <Text style={{ fontSize: '2rem' }}>
                  Drop your image here...
                </Text>{' '}
                <Text>or</Text>
                <Button color='violet' inverted>
                  Browse Files
                </Button>
              </>
            )}
          </div>
        </Uploader>
        <PreviewHolder>
          {`Preview of Your New ${'Profile'} Image:`}
          <ProfilePic src={props.displayImage || Default} alt={'Preview'} />
        </PreviewHolder>
        <DoneButton>
          <Button onClick={() => setModal(false)} color='violet' fluid>
            Done
          </Button>
        </DoneButton>
      </UploadModal>
    )
  }

  return {
    image,
    banner,
    UploaderUI,
    modalOpen,
    setModal,
  }
}

const ProfilePic = styled.img`
  border-color: black;
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  flex: 0 0 auto;
`

const Uploader = styled.div`
  background: #fff;
  padding: 16px;
  width: 90%;
  border: 2px dashed lightgrey;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: auto;
`

const Text = styled.p`
  margin: 1rem 0 1rem 0;
`

const DropText = styled.p`
  font-size: 2rem;
  padding: 10%;
`

const PreviewHolder = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  margin: 5% auto;
`

const DoneButton = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin: auto;
`

const UploadModal = styled(Modal.Content)`
  :first-child {
    display: flex;
    flex-direction: column;
  }
`

export default useImageUploader
