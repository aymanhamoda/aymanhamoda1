import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import Upload from '../../components/Upload'
import FilePreview from '../../components/FilePreview'

const AdminScreen = () => {
  const [files, setFiles] = useState([])
  const [folderName, setFolderName] = useState('')
  const [show, setShow] = useState(false)
  const [fileToPreview, setFileToPreview] = useState('')
  const [admin, setAdmin] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleClose = () => {
    setShow(false)
  }
  const handleFolderName = (f) => {
    if (folderName) {
      setFolderName(`${folderName}/${f}`)
    } else {
      setFolderName(f)
    }
  }
  const handleFileShow = (f) => {
    if (folderName) {
      setFileToPreview(`/uploads/${folderName}/${f}`)
    } else {
      setFileToPreview(`/uploads/${f}`)
    }
    setShow(true)
  }

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        setAdmin(true)
      }
    }

    axios
      .get(`/api/uploadedfiles?folderPath=${folderName}`)
      .then((res) => setFiles(res.data))
  }, [folderName, userInfo])

  return (
    <>
      <FilePreview
        handleClose={handleClose}
        fileToPreview={fileToPreview}
        show={show}
        admin={admin}
      />

      <div className="container py-5">
        <div className="row">
          <div className="col">
            <h1>Current Folder: {!folderName ? 'uploads' : folderName} </h1>
            <Button variant="success" onClick={() => setFolderName('')}>
              <i className="fas fa-home"></i> Home
            </Button>

            {files.map((f) => (
              <div key={f}>
                {f.search(/\./) > 0 ? (
                  <div
                    onClick={() => handleFileShow(f)}
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    style={{
                      textDecoration: 'underline',
                      color: 'blue',
                      borderColor: 'black',
                      margin: '5px',
                    }}>
                    <h4 className="mb-1">{f} </h4>
                  </div>
                ) : (
                  <div
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    onClick={() => handleFolderName(f)}
                    style={{
                      textDecoration: 'underline',
                      color: 'red',
                      borderColor: 'black',
                      margin: '5px',
                    }}>
                    <h4 className="mb-1">{f} </h4>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {admin && <Upload uploadTo={folderName} />} */}
    </>
  )
}

export default AdminScreen
