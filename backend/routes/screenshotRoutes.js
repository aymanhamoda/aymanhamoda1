import express from 'express'
const router = express.Router()

import {
  getScreenshotDetails,
  createScreenshotDetails,
  getScreenshots,
  createScreenshotTitle,
  deleteDetails,
} from '../controllers/screenshotController.js'

router.route('/').get(getScreenshots)
router.route('/').post(createScreenshotTitle)
router.route('/:id').get(getScreenshotDetails)
router.route('/:id').post(createScreenshotDetails)
router.route('/:id').delete(deleteDetails)

export default router
