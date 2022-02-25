import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Loader from '../../components/Loader'

const YoutubeNew = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState()
  const [uploadedData, setUploadedData] = useState()

  const createMedia = (e) => {
    setUploading(true)
    e.preventDefault()
    axios
      .post(`/api/youtube`, { title, url, image, description })
      .then((res) => setUploadedData(res.data))
  }

  useEffect(() => {
    if (uploadedData) {
      setUploading(false)
    }
  }, [uploadedData])
  return (
    <div className="container py-5">
      <h3>NEW MEDIA</h3>
      <div className="row">
        <div className="col">
          <Form onSubmit={createMedia}>
            <FormGroup className="py-2">
              <FormLabel style={{ fontWeight: 'bold' }}>Title</FormLabel>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup className="py-2">
              <FormLabel style={{ fontWeight: 'bold' }}>
                Scientific Content
              </FormLabel>
              <Form.Control
                type="text"
                placeholder="Enter Media url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup className="py-2">
              <FormLabel style={{ fontWeight: 'bold' }}>Cover Image</FormLabel>
              <Form.Control
                type="text"
                placeholder="Enter Image Cover"
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
            </FormGroup>
            <FormGroup className="py-2">
              <FormLabel style={{ fontWeight: 'bold' }}>Description</FormLabel>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setDescription(data)
                }}
              />
            </FormGroup>
            <div className="container">
              <div className="row d-flex justify-content-end py-3 ">
                {uploading ? (
                  <Loader />
                ) : (
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default YoutubeNew
