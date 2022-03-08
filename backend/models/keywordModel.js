import mongoose from 'mongoose'

const keywordSchema = mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Keyword = mongoose.model('Keyword', keywordSchema)

export default Keyword
