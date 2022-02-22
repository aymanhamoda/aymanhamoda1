import express from 'express'
const router = express.Router()
import {
  getCourseDetails,
  getCourses,
  updateCourse,
} from '../controllers/courseController.js'

router.route('/').get(getCourses)
router.route('/:id').get(getCourseDetails).put(updateCourse)

export default router
