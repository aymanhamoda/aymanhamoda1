import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).sort({ _id: -1 })
  res.json({ courses })
})

const getCourseDetails = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  res.json({ course })
})

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const {
    title,
    lectures,
    description,
    urlOffer,
    details,
    image,
    keywords,
    isFree,
  } = req.body
  console.log(isFree)
  const course = await Course.findById(req.params.id)

  if (course) {
    course.title = title
    course.description = description
    course.urlOffer = urlOffer
    course.image = image
    course.details = details
    course.isFree = isFree
    course.keywords = keywords
    course.lectures = lectures

    const updatedCourse = await course.save()
    res.json(updatedCourse)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})
export { getCourses, getCourseDetails, updateCourse }
