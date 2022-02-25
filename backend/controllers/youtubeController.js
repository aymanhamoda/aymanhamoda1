import asyncHandler from 'express-async-handler'
import Youtube from '../models/youtubeModel.js'

// @desc    Fetch all teamwork
// @route   GET /api/teamwork
// @access  Public
const getYoutubes = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit)
  const youtubes = await Youtube.find({}).sort({ views: -1 }).limit(limit)

  res.json({ youtubes })
})

// @desc    Fetch single teamwork
// @route   GET /api/teamworks/:id
// @access  Public
const getYoutubeById = asyncHandler(async (req, res) => {
  const youtube = await Youtube.findById(req.params.id)

  if (youtube) {
    res.json(youtube)
    youtube.views = youtube.views + 1
    const updateViews = youtube.save()
  } else {
    res.status(404)
    throw new Error('Youtube not found')
  }
})

const createYoutube = asyncHandler(async (req, res) => {
  const youtube = new Youtube({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    image: req.body.image,
    views: req.body.views,
    keywords: req.body.keywords,
  })
  const createdYoutube = await youtube.save()
  res.status(201).json(createdYoutube)
})

const deleteYoutube = asyncHandler(async (req, res) => {
  const youtube = await Youtube.findById(req.params.id)

  if (youtube) {
    await youtube.remove()
    res.json({ message: 'youtube removed' })
  } else {
    res.status(404)
    throw new Error('youtube not found')
  }
})

export { getYoutubes, getYoutubeById, createYoutube, deleteYoutube }
