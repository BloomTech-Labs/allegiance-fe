import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

const useImageUploader = type => {
    const [image, setImage] = useState()
    const [banner, setBanner] = useState()
    const onDrop = useCallback(acceptedFiles => {
        const timestamp = Date.now() / 1000;
        let formData = new FormData();
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_APIKEY);
        formData.append("file", acceptedFiles[0]);
        formData.append("timestamp", timestamp);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        const uploadImage = async () => {
            const result = await axios.post(
                process.env.REACT_APP_CLOUDINARY_URL,
                formData
            )
            type === 'banner' ? setBanner(result.data.url) : setImage(result.data.url)
        }
        uploadImage()
    }, [type])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return {
        getRootProps,
        getInputProps,
        isDragActive,
        image,
        banner
    }
}

export default useImageUploader