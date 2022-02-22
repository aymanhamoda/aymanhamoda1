import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Meta from '../../components/Meta'
import Loader from '../../components/Loader'

const CoursePlay = ({ match }) => {
  const courseId = match.params.id

  const [course, setCourse] = useState()
  const [videoOrder, setVideoOrder] = useState(0)
  const [playedVideoPath, setPlayedVideoPath] = useState('')
  const [playedVideoTitle, setPlayedVideoTitle] = useState('')
  const [playedVideoDescription, setPlayedVideoDescription] = useState('')
  const [viewProgress, setViewProgress] = useState(0)
  const [playedDuration, setPlayedDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [courseKeywords, setCourseKeywords] = useState([])

  const handlePlay = (v) => {
    let selectedVideoOrder = course.lectures.indexOf(v)
    setVideoOrder(selectedVideoOrder)
  }
  const getNextVideo = () => {
    const lecturesCount = course.lectures.length - 1
    console.log(lecturesCount)
    console.log(videoOrder)
    if (videoOrder === lecturesCount) {
      setVideoOrder(videoOrder)
    } else {
      setVideoOrder(videoOrder + 1)
    }
  }
  useEffect(() => {
    if (!course) {
      axios.get(`/api/courses/${courseId}`).then((res) =>
        setCourse({
          title: res.data.course.title,
          description: res.data.course.description,
          image: res.data.course.image,
          urlOffer: res.data.course.urlOffer,
          lectures: res.data.course.lectures,
          keywords: res.data.course.keywords,
        })
      )
    } else {
      let selectedVideo = course.lectures[videoOrder]
      setCourseTitle(course.title)
      setCourseDescription(course.description)
      setCourseKeywords(course.keywords)
      setPlayedVideoPath(selectedVideo.video)
      setPlayedVideoTitle(selectedVideo.title)
      setPlayedVideoDescription(selectedVideo.description)
    }

    if (playing) {
      setInterval(() => {
        setPlayedDuration((seconds) => seconds + 0.01)
      }, 100)
    }
    setViewProgress((playedDuration * 100) / videoDuration)
  }, [playedVideoPath, playing, playedVideoTitle, videoOrder, course, courseId])
  return (
    <>
      <Meta
        title={playedVideoTitle}
        description={courseDescription}
        keywords={courseKeywords.map((k) => {
          return k.keyword
        })}
      />
      <div className="container py-2">
        <div className="row ">
          {!course ? (
            <Loader />
          ) : (
            <div className="col-md-8  ">
              <h3 className="py-3 col text-info">
                {courseTitle} | {playedVideoTitle}
              </h3>
              <ReactPlayer
                playing
                controls
                onEnded={() => getNextVideo()}
                onDuration={(e) => setVideoDuration(e)}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                url={playedVideoPath}
                className="col"
              />
              <h3 className="col lead">{playedVideoDescription}</h3>
            </div>
          )}

          {course && (
            <div className="col-md-4 p-4">
              <h3 className="text-center text-info py-2">Lectures</h3>
              {course.lectures.map((v) => (
                <div
                  key={v._id}
                  style={
                    v.video === playedVideoPath
                      ? {
                          backgroundColor: '#17a2b8',
                        }
                      : { backgroundColor: 'transparent' }
                  }
                  className="row align-items-center">
                  {/* <div className="col-2">
                  <input
                    type="checkbox"
                    checked={viewProgress >= 85 ? true : false}></input>
                </div> */}
                  <div
                    className="col btn border-info"
                    onClick={() => handlePlay(v)}>
                    <p className="lead">{v.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CoursePlay
