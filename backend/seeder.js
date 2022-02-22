import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import courses from './data/courses.js'
import Course from './models/courseModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    const sampleCourses = courses.map((screenshot) => {
      return { ...screenshot }
    })

    await Course.insertMany(sampleCourses)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
