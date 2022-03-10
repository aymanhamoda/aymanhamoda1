import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Meta from '../../components/Meta'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Container } from 'react-bootstrap'

const Courses = ({ offMeta }) => {
  const [courses, setCourses] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    try {
      axios.get('/api/courses').then((res) => setCourses(res.data.courses))
    } catch (error) {
      setError(error)
      setCourses()
    }
  }, [])

  return (
    <>
      <div className="bg-secondary p-5">
        {!courses ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {!offMeta && (
              <Meta
                title="Clinical Pharmacy Courses"
                description="Clinical Pharmacy lectures"
                keywords={courses.map((course) => {
                  return course.title
                })}
              />
            )}
            <div className="text-center text-white pb-5">
              <h1>Clinical Pharmacy Courses</h1>
            </div>
            <Container>
              <div className="row">
                {courses.map((course) => (
                  <div className="col-md-4" key={course._id}>
                    <div
                      className="card text-white bg-info mb-3"
                      style={{ minHeight: '225px' }}
                      key={course._id}>
                      <div className="card-header">
                        <strong>{course.title}</strong>
                      </div>
                      <div className="card-body">
                        <p className="card-text lead text-right">
                          {' '}
                          {course.description}
                        </p>

                        {course.isFree ? (
                          <a className="btn btn-danger" href={course.urlOffer}>
                            مجاني
                          </a>
                        ) : (
                          <a className="btn btn-danger" href={course.urlOffer}>
                            تعرف على المزيد
                          </a>
                        )}
                      </div>
                    </div>{' '}
                  </div>
                ))}
              </div>
            </Container>
          </>
        )}
      </div>
    </>
  )
}

export default Courses
