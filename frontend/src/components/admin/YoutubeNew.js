import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import Keywords from '../Keywords'

const YoutubeNew = ({ selectedYoutube, setSelectedYoutube }) => {
  const [mediaId, setMediaId] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState([{ idx: 0, keyword: '' }])
  const [uploading, setUploading] = useState(false)
  const [uploadedData, setUploadedData] = useState()

  const copyToBank = (keyword) => {
    axios.post(`/api/keyword`, { keyword })
  }
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
        `/api/upload?folderPath=/images`,
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
  const uploadContentHandler = async (e) => {
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
        `/api/upload?folderPath=/images`,
        formData,
        config
      )

      setUrl(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const createMedia = (e) => {
    e.preventDefault()
    setUploading(true)
    axios
      .post(`/api/youtube`, { title, url, image, description, keywords })
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

  const newKeyword = () => {
    setKeywords([...keywords, { idx: Math.random(), keyword: '' }])
  }
  const copyKeyword = (k) => {
    setKeywords([...keywords, { idx: Math.random(), keyword: k.keyword }])
  }
  const handelKeywords = (e, k) => {
    k.keyword = e.target.value
  }

  useEffect(() => {
    if (uploadedData) {
      setUploading(false)
      setSelectedYoutube()
    }

    if (selectedYoutube) {
      setMediaId(selectedYoutube._id)
      setTitle(selectedYoutube.title)
      setUrl(selectedYoutube.url)
      setImage(selectedYoutube.image)
      setDescription(selectedYoutube.description)
      if (selectedYoutube.keywords.length === 0) {
        setKeywords([{ idx: Math.random(), keyword: '' }])
      } else {
        setKeywords(selectedYoutube.keywords)
      }
    }
  }, [uploadedData, selectedYoutube, image, uploading])
  return (
    <>
      <div className="container py-5">
        <h3>NEW MEDIA</h3>

        <div className="row">
          <div className="col">
            <Form>
              <FormGroup className="py-2" controlId="title  ">
                <FormLabel style={{ fontWeight: 'bold' }}>Title</FormLabel>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}></Form.Control>
              </FormGroup>
              <Form.Group controlId="url">
                <Form.Label className="font-weight-bold">
                  Scientific Content
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}></Form.Control>
                <Form.Control
                  type="file"
                  id="url-file"
                  label="Choose File"
                  custom="true"
                  onChange={uploadContentHandler}
                />
                {/* {uploading && <Loader />} */}
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label className="font-weight-bold">
                  Image Cover
                </Form.Label>
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
              <FormGroup className="py-2" controlId="descritpion">
                <FormLabel className="font-weight-bold">Description</FormLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setDescription(data)
                  }}
                />
              </FormGroup>{' '}
              <FormGroup className="row py-2 ">
                <div className="col font-weight-bold">Keywords</div>
                <div>
                  <div
                    className="btn btn-outline-danger"
                    onClick={() => newKeyword()}>
                    Add new keyword
                  </div>
                </div>
              </FormGroup>
              <div className="row py-2">
                {keywords.map((k) => (
                  <>
                    <FormGroup className="col-sm-4 py-2" key={k}>
                      <input
                        defaultValue={k.keyword}
                        onChange={(e) => handelKeywords(e, k)}
                        type="text"
                        className="form-control required"
                        placeholder="keyword"
                        name="keyword"
                        data-id={k._id}
                        id={k.keyword}
                      />
                    </FormGroup>

                    <FormGroup className="col-sm-2 py-2">
                      <div
                        className="btn btn-outline-dark"
                        onClick={() => copyToBank(k.keyword)}>
                        <i className="fa fa-copy" aria-hidden="true" />{' '}
                      </div>
                    </FormGroup>
                  </>
                ))}
              </div>
            </Form>

            <div className="row d-flex  py-3 ">
              <div className="col">
                <div className="d-flex justify-content-between">
                  {uploading ? (
                    <Loader />
                  ) : (
                    <>
                      <Button onClick={(e) => createMedia(e)} variant="primary">
                        Create
                      </Button>

                      {mediaId && (
                        <>
                          <Link className="btn btn-success" to={`${mediaId}`}>
                            Show
                          </Link>
                          <Button
                            onClick={() => updateMedia(mediaId)}
                            className="btn-dark">
                            Update
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <Keywords copyKeyword={copyKeyword} />
          </div>
        </div>
      </div>
    </>
  )
}

export default YoutubeNew
