import express from 'express'
const router = express.Router()
import {
  getYoutubes,
  getYoutubeById,
  createYoutube,
  deleteYoutube,
} from '../controllers/youtubeController.js'

router.route('/').get(getYoutubes)
router.route('/:id').get(getYoutubeById)
router.route('/:id').delete(deleteYoutube)
router.route('/').post(createYoutube)

export default router
