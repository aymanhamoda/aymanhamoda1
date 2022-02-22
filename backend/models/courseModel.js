import mongoose from 'mongoose'

const keywordSchema = mongoose.Schema(
  {
    keyword: { type: String },
  },
  {
    timestamps: true,
  }
)

const lectureSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    video: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
)

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
    urlOffer: {
      type: String,
    },
    details: {
      type: String,
    },
    image: {
      type: String,
    },
    lectures: [lectureSchema],
    keywords: [keywordSchema],
  },
  {
    timestamps: true,
  }
)

const Course = mongoose.model('Course', courseSchema)

export default Course
