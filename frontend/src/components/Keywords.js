import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import Loader from './Loader'

const Keywords = ({ show, copyKeyword, setShowKeywordsBank }) => {
  const [keywordsBank, setKeywordsBank] = useState()

  useEffect(() => {
    if (!keywordsBank) {
      axios.get('/api/keyword').then((res) => setKeywordsBank(res.data))
    }
  }, [keywordsBank])
  return (
    <>
      {!keywordsBank ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="font-weight-bold text-center">Keywords Bank</div>
          {keywordsBank.keywords.map((k) => (
            <div
              key={k._id}
              className="btn btn-outline-success m-1"
              onClick={() => copyKeyword(k)}>
              {k.keyword}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Keywords
