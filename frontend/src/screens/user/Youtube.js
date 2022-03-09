import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Meta from '../../components/Meta'
import { Alert, Image } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'

const Youtube = ({ offMeta, limit }) => {
  const [youtubes, setYoutubes] = useState()
  const [error, setError] = useState('')
  if (youtubes) {
    let mergedKeywords = youtubes.map((y) => {
      return y.keywords
    })

    for (let index = 0; index < 10; index++) {
      mergedKeywords = [...mergedKeywords, mergedKeywords[index]]
      if (index === 9) {
        console.log(mergedKeywords)
      }
    }
  }
  useEffect(() => {
    try {
      axios
        .get(`/api/youtube?limit=${limit}`)
        .then((res) => setYoutubes(res.data.youtubes))
    } catch (error) {
      setError(error)
      console.log(error)
      setYoutubes()
    }
  }, [error, offMeta])
  return (
    <>
      {!offMeta && (
        <Meta
          title="Clinical Pharmacy Course"
          description="Clinical Pharmacy Questions and answers pdf"
          keywords="Clinical Pharmacy and Therapeuitcs"
        />
      )}

      <div className="bg-info py-5 text-center text-white">
        {error && <Alert>{error}</Alert>}

        <h1>My Media</h1>
        {!youtubes ? (
          <Loader />
        ) : (
          <div className="container">
            <div className="row">
              {youtubes.map((youtube) => (
                <div key={youtube._id} className="p-2 col-md-4">
                  <Link to={`youtube/${youtube._id}`}>
                    <Image src={youtube.image} fluid />
                  </Link>
                </div>
              ))}
            </div>
            {offMeta && (
              <Link to={`/media`} className="col font-dark text-white">
                <h1 className="lead">See All</h1>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Youtube
