import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { Button, Modal, Image, Row } from 'react-bootstrap'

const FilePreview = ({ fileToPreview, handleClose, show, admin, media }) => {
  const [text, setText] = useState('')

  const deleteMedia = (e) => {
    axios.delete(`/api/youtube/${e}`)
    handleClose()
  }

  const deleteFile = () => {
    axios.get(`/api/delete?filePath=${fileToPreview}`)
    handleClose()
  }

  const urlify = (e) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g
    return e.replace(urlRegex, (url) => {
      return '<a href="' + url + '">' + url + `</a>`
    })
  }

  useEffect(() => {
    if (media) {
      if (media.description) {
        setText(media.description)
      }
    }
  }, [media])

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Media Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {fileToPreview.search(/\.mp4/) > 0 ? (
          <ReactPlayer url={fileToPreview} playing controls width="100%" />
        ) : (
          <Image src={fileToPreview} fluid />
        )}
        <Row>&nbsp;</Row>
        {media && <h5>Views: {media.views}</h5>}
        <Row>&nbsp;</Row>

        {media ? (
          <div dangerouslySetInnerHTML={{ __html: `${urlify(text)}` }} />
        ) : (
          <div></div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* enable delete for Admin */}
        {admin && (
          <Button
            variant="danger"
            className="mr-auto"
            type="submit"
            onClick={() => deleteFile()}>
            Delete
          </Button>
        )}
        {admin && (
          <Button
            variant="primary"
            className="mr-auto"
            type="submit"
            onClick={() => deleteMedia(media._id)}>
            Delete Media
          </Button>
        )}
        <Button
          variant="secondary"
          className="ml-auto"
          onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FilePreview
