import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, FormLabel } from 'react-bootstrap'

const YoutubeNew = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  const createMedia = (e) => {
    e.preventDefault()
    axios
      .post(`/api/youtube`, { title, url, image, description })
      .then((res) => console.log(res.data))
  }
  return (
    <Form onSubmit={createMedia}>
      <FormGroup>
        <FormLabel style={{ fontWeight: 'bold' }}>Title</FormLabel>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}></Form.Control>
      </FormGroup>
      <FormGroup>
        <FormLabel style={{ fontWeight: 'bold' }}>Media</FormLabel>
        <Form.Control
          type="text"
          placeholder="Enter Media url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}></Form.Control>
      </FormGroup>
      <FormGroup>
        <FormLabel style={{ fontWeight: 'bold' }}>Image</FormLabel>
        <Form.Control
          type="text"
          placeholder="Enter Image Cover"
          value={image}
          onChange={(e) => setImage(e.target.value)}></Form.Control>
      </FormGroup>
      <FormGroup>
        <FormLabel style={{ fontWeight: 'bold' }}>Description</FormLabel>
        <Form.Control
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}></Form.Control>
      </FormGroup>
      <Button type="submit" variant="primary" style={{ float: 'right' }}>
        Submit
      </Button>
    </Form>
  )
}

export default YoutubeNew
