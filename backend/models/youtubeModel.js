import mongoose from 'mongoose'

const keywordSchema = mongoose.Schema(
  {
    keyword: { type: String },
  },
  {
    timestamps: true,
  }
)
const youtubeSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    keywords: [keywordSchema],
  },
  {
    timestamps: true,
  }
)

const Youtube = mongoose.model('Youtube', youtubeSchema)

export default Youtube
