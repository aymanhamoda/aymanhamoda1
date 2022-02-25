import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, FormLabel, Image } from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Loader from '../../components/Loader'

const YoutubeNew = ({ selectedYoutube }) => {
  const [mediaId, setMediaId] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState([])
  const [uploading, setUploading] = useState()
  const [uploadedData, setUploadedData] = useState()

  const createMedia = (e) => {
    e.preventDefault()
    setUploading(true)
    axios
      .post(`/api/youtube`, { title, url, image, description })
      .then((res) => setUploadedData(res.data))
  }

  const updateMedia = (e) => {
    setUploading(true)
    axios
      .put(`/api/youtube/${e}`, {
        title,
        url,
        image,
        description,
        keywords,
      })
      .then((res) => setUploadedData(res.data))
  }

  useEffect(() => {
    if (uploadedData) {
      setUploading(false)
    }
    if (selectedYoutube) {
      setMediaId(selectedYoutube._id)
      setTitle(selectedYoutube.title)
      setUrl(selectedYoutube.url)
      setImage(selectedYoutube.image)
      setDescription(selectedYoutube.description)
      setKeywords(selectedYoutube.keywords)
    }
  }, [uploadedData, selectedYoutube])
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
              {image && (
                <Image className="d-flex flex-row-reverse" src={image} fluid />
              )}
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
              <div className="row d-flex  py-3 ">
                <div className="col justify-content-end">
                  {uploading ? (
                    <Loader />
                  ) : (
                    <Button type="submit" variant="primary">
                      Create
                    </Button>
                  )}

                  <Button
                    className="ml-2"
                    onClick={() => updateMedia(mediaId)}
                    style={{ float: 'right' }}
                    variant="secondary">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default YoutubeNew
