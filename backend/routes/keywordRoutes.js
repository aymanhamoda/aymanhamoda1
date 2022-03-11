import express from 'express'
import {
  createKeyword,
  createManyKeyword,
  getKeywords,
} from '../controllers/keywordController.js'

const router = express.Router()
router.route('/').get(getKeywords)
router.route('/').post(createKeyword)
router.route('/many').post(createManyKeyword)

export default router
