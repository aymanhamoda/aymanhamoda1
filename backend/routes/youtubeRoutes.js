import express from 'express'
const router = express.Router()
import {
  getYoutubes,
  getYoutubeById,
  createYoutube,
  deleteYoutube,
  updateYoutube,
} from '../controllers/youtubeController.js'

router.route('/').get(getYoutubes)
router.route('/:id').get(getYoutubeById)
router.route('/:id').delete(deleteYoutube)
router.route('/:id').put(updateYoutube)
router.route('/').post(createYoutube)

export default router
