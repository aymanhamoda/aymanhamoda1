import axios from 'axios'
import React, { useState } from 'react'
import { ProgressBar, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PROGRESSION } from '../constants/progressionConstants'

const Upload = ({ uploadTo }) => {
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('')

  const getProgression = useSelector((state) => state.progressionStore)
  const { progression } = getProgression

  const dispatch = useDispatch()

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        const grow = Math.round((100 * data.loaded) / data.total)
        dispatch({ type: PROGRESSION, payload: grow })
      },
    }

    const { data } = await axios.post(
      `/api/upload?folderPath=${uploadTo}`,
      formData,
      config
    )
    setImage(data)
    setUploading(false)
  }

  // useEffect(() => {

  // }, [])

  return (
    <>
      <Form>
        <Form.Group controlId="image">
          <Form.Label>Upload File</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}></Form.Control>
          <Form.File
            id="image-file"
            label="Choose File"
            custom
            onChange={uploadFileHandler}></Form.File>
          {uploading && (
            <ProgressBar
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: progression }}
            />
          )}
        </Form.Group>
      </Form>
    </>
  )
}

export default Upload
