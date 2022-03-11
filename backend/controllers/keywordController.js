import asyncHandler from 'express-async-handler'
import Keyword from '../models/keywordModel.js'

const getKeywords = asyncHandler(async (req, res) => {
  const keywords = await Keyword.find({}).sort({ keyword: +1 })
  res.json({ keywords })
})

const createKeyword = asyncHandler(async (req, res) => {
  const keyword = new Keyword({
    keyword: req.body.keyword,
  })
  const createdKeyword = await keyword.save()
  res.status(201).json(createdKeyword)
})

const createManyKeyword = asyncHandler(async (req, res) => {
  const keywords = req.body.keywords
  const manyKeywords = keywords.map((k) => {
    return { ...k }
  })
  console.log(manyKeywords)

  await Keyword.insertMany(manyKeywords)
  console.log('Data Imported!'.green.inverse)
  process.exit()
})

export { getKeywords, createKeyword, createManyKeyword }
