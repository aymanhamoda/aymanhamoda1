import axios from 'axios'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
const Upload = ({ image, uploadTo, setImage, label, setUploading }) => {
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        `/api/upload?folderPath=${uploadTo}`,
        formData,
        config
      )

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect(() => {
    if (!image) {
      setImage('/uploads/images/')
    }
  }, [image])

  return (
    <>
      <Form.Group controlId="image">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}></Form.Control>
        <Form.Control
          type="file"
          id="image-file"
          label="Choose File"
          custom="true"
          onChange={uploadFileHandler}
        />
        {/* {uploading && <Loader />} */}
      </Form.Group>
    </>
  )
}

export default Upload
