import asyncHandler from 'express-async-handler'
import Screenshot from '../models/screenshotModel.js'

// @desc    Fetch all screenshots
// @route   GET /api/screenshots
// @access  Public
const getScreenshots = asyncHandler(async (req, res) => {
  const screenshots = await Screenshot.find({}).sort({ title: +1 })
  res.json({ screenshots })
})

// @desc    get screenshot details
// @route   GET /api/screenshots/:id
// @access  Private/Admin

const getScreenshotDetails = asyncHandler(async (req, res) => {
  const screenshot = await Screenshot.findById(req.params.id)
  res.json({ screenshot })
})

// @desc    Create a new Screenshot Title
// @route   POST /api/screenshots
// @access  Private/Admin ?
const createScreenshotTitle = asyncHandler(async (req, res) => {
  const screenshotTitle = new Screenshot({
    title: req.body.title,
  })
  const createdScreenshotTitle = await screenshotTitle.save()
  res.status(201).json(createdScreenshotTitle)
})

// @desc    Create a new screenshot detail
// @route   POST /api/screenshot/:id
// @access  Private/Admin ??

const createScreenshotDetails = asyncHandler(async (req, res) => {
  //find the title
  const screenshot = await Screenshot.findById(req.params.id)
  const detail = {
    subtitle: req.body.subtitle,
    caption: req.body.caption,
    image: req.body.image,
  }
  screenshot.details.push(detail)
  await screenshot.save()
  res.status(201).json({ message: 'detail added' })
})

// @desc    Delete a detail
// @route   DELETE /api/screenshots/:id
// @access  Private/Admin
// const deleteDetails = asyncHandler(async (req, res) => {
const deleteDetails = (req, res) => {
  // const screenshot = await Screenshot.findById(req.params.id)
  // const deletedDetails = screenshot.details.find(
  //   (d) => d._id.toString() === req.body.id.toString()
  // )

  Screenshot.updateOne(
    { _id: req.params.id },
    { $pull: { details: { _id: req.body.id } } },
    function (err, result) {
      if (!err) {
        console.log('successfully deleted')
      } else {
        console.log(err)
      }
    }
  )

  // if (deletedDetails) {
  //   console.log(deletedDetails)
  //   await deletedDetails.remove({})
  //   res.json({ message: 'Details removed' })
  // } else {
  //   res.status(404)
  //   throw new Error('User not found')
  // }
}

export {
  deleteDetails,
  getScreenshots,
  getScreenshotDetails,
  createScreenshotTitle,
  createScreenshotDetails,
}
