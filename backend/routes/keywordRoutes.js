import express from 'express'
import { createKeyword, getKeywords } from '../controllers/keywordController.js'

const router = express.Router()
router.route('/').get(getKeywords)
router.route('/').post(createKeyword)

export default router
