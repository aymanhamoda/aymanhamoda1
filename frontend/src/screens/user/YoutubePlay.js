import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import { Image, ListGroup, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Meta from '../../components/Meta'
import Loader from '../../components/Loader'

const YoutubePlay = ({ match }) => {
  const videoId = match.params.id

  const [youtubes, setYoutubes] = useState()
  const [youtubeList, setYoutubeList] = useState()
  const [fileToPreview, setFileToPreview] = useState('')
  const [error, setError] = useState('')
  const [media, setMedia] = useState()
  const [mediaTitle, setMediaTitle] = useState()
  const [admin, setAdmin] = useState('')
  const [text, setText] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const urlify = (e) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g
    return e.replace(urlRegex, (url) => {
      return '<a href="' + url + '">' + 'Link' + `</a>`
    })
  }

  useEffect(() => {
    // get all videos
    if (!youtubes) {
      try {
        axios.get('/api/youtube').then((res) => setYoutubes(res.data.youtubes))
      } catch (error) {
        setError(error)
        setYoutubes([])
      }
    } else {
      setMedia(youtubes.find((x) => x._id === videoId))
    }
    if (media) {
      setFileToPreview(media.url)
      setMediaTitle(media.title)
      setYoutubeList(youtubes.filter((x) => x._id !== media._id))
      setText(media.description)
    }
    if (userInfo) {
      if (userInfo.isAdmin) {
        setAdmin(true)
      }
    }
  }, [videoId, userInfo, text, fileToPreview, media, youtubes])

  return (
    <>
      {media && (
        <Meta
          title={mediaTitle}
          keywords={youtubes.map((youtube) => {
            return youtube.keywords
          })}
        />
      )}

      <Container className="pt-5 ">
        <div className="row">
          {!media ? (
            <Loader />
          ) : (
            <section id="viewPart" className="col-md-8 ">
              {fileToPreview.search(/\.mp4/) > 0 ? (
                <ReactPlayer
                  url={fileToPreview}
                  playing
                  controls
                  width="100%"
                />
              ) : (
                <Image src={fileToPreview} fluid />
              )}
              <p className="py-5 lead justify-content-center">
                <div dangerouslySetInnerHTML={{ __html: `${urlify(text)}` }} />
              </p>
            </section>
          )}
          {youtubeList && (
            <div className="col-md-4">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col">
                    <h3>See also</h3>
                    {youtubeList.map((youtube) => (
                      <div>
                        <ListGroup key={youtube._id} className="p-2">
                          <Link
                            to={`/youtube/${youtube._id}`}
                            onClick={() =>
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }>
                            <Image src={youtube.image} fluid />
                          </Link>
                        </ListGroup>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}

export default YoutubePlay
