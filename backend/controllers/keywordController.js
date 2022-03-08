import asyncHandler from 'express-async-handler'
import Keyword from '../models/keywordModel.js'

const getKeywords = asyncHandler(async (req, res) => {
  const keywords = await Keyword.find({}).sort({ keyword: +1 })
  res.json({ keywords })
})

const createKeyword = asyncHandler(async (req, res) => {
  console.log(req.body)
  const keyword = new Keyword({
    keyword: req.body.keyword,
  })
  const createdKeyword = await keyword.save()
  res.status(201).json(createdKeyword)
})

export { getKeywords, createKeyword }
