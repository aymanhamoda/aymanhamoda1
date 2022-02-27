import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'
import Meta from './Meta'
import { Image } from 'react-bootstrap'

const CourseDetails = ({ match }) => {
  const courseId = match.params.id

  const [course, setCourse] = useState({
    title: 'The Title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet blanditiis incidunt iusto corrupti illum cum laudantium ex sequi amet.',
    image: '/22.jpg',
    details: '',
    urlOffer: '',
    lectures: [
      { _id: 1, title: 'Lecture Title 1' },
      { _id: 2, title: 'Lecture Title 2' },
      { _id: 3, title: 'Lecture Title 3' },
    ],
    loading: false,
  })

  // useEffect(() => {
  //   axios.get(`/api/courses/${courseId}`).then((res) =>
  //     setCourse({
  //       title: res.data.course.title,
  //       description: res.data.course.description,
  //       image: res.data.course.image,
  //       urlOffer: res.data.course.urlOffer,
  //       loading: false,
  //     })
  //   )
  // }, [courseId])

  return (
    <>
      <Meta title={course.title} description={course.description} />
      {course.loading ? (
        <Loader />
      ) : (
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="container">
                <div className="row">
                  <h1>{course.title}</h1>
                </div>
                <div className="row py-3">
                  <h1 className="lead">{course.description}</h1>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <Image src={course.image} fluid />
            </div>
          </div>
          <div className="row py-3">
            <div className="col">
              {course.lectures.map((l) => (
                <div key={l._id}>
                  <h1 className="lead">{l.title}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseDetails
