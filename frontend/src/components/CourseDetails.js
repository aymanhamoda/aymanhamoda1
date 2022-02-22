import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import Meta from './Meta'

const CourseDetails = ({ match }) => {
  const courseId = match.params.id

  // const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState({
    title: '',
    description: '',
    image: '',
    details: '',
    urlOffer: '',
    loading: true,
  })

  useEffect(() => {
    axios.get(`/api/courses/${courseId}`).then((res) =>
      setCourse({
        title: res.data.course.title,
        description: res.data.course.description,
        image: res.data.course.image,
        urlOffer: res.data.course.urlOffer,
        loading: false,
      })
    )
  }, [courseId])

  return (
    <>
      <Meta title={course.title} description={course.description} />
      {course.loading ? (
        <Loader />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div className="form-group">
            <h1>{course.title}</h1>
            <h2>{course.description}</h2>
            <image src={course.image} style={{ width: '50%' }} />
          </div>

          <div className="form-group">
            <button
              className="btn btn-info"
              onClick={() => window.open(course.urlOffer, '_self')}>
              احصل على العرض
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseDetails
