import mongoose from 'mongoose'
const detailSchema = mongoose.Schema(
  {
    subtitle: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const screenshotSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: [detailSchema],
  },
  {
    timestamps: true,
  }
)

const Screenshot = mongoose.model('Screenshot', screenshotSchema)

export default Screenshot
