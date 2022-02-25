import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import YoutubeNew from '../../components/admin/YoutubeNew'

const YoutubeDashboard = () => {
  const [youtubes, setYoutubes] = useState()
  const [selectedYoutube, setSelectedYoutube] = useState('')
  const [error, setError] = useState('')

  const history = useHistory()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    try {
      axios.get(`/api/youtube`).then((res) => setYoutubes(res.data.youtubes))
    } catch (error) {
      setError(error)
      console.log(error)
      setYoutubes()
    }
  }, [error])

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [userInfo])

  return (
    <div className="container">
      <YoutubeNew selectedYoutube={selectedYoutube} />
      {youtubes && (
        <>
          {youtubes.map((y) => (
            <div
              className="row"
              key={y._id}
              onClick={() => setSelectedYoutube(y)}>
              <div className="col">
                <h1 className="lead text-left btn btn-outline-dark btn-block p-3 ">
                  {y.title}
                </h1>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default YoutubeDashboard
