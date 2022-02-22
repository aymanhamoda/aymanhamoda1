import path from 'path'
import fs from 'fs'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import youtubeRoutes from './routes/youtubeRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import promotionRoutes from './routes/promotionRoutes.js'
import screenshotRoutes from './routes/screenshotRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/youtubes', youtubeRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/promotions', promotionRoutes)
app.use('/api/screenshots', screenshotRoutes)
app.use('/api/youtube', youtubeRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/uploadedfiles', (req, res) => {
  const folderName = req.query.folderPath || ''
  const files = fs.readdirSync(`uploads/${folderName}`)
  res.send(files)
})

app.get('/api/delete', (req, res) => {
  const file = req.query.filePath
  fs.unlinkSync(`.${file}`, (err) => {
    if (err) {
      res.send(err)
    }
  })
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3500

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
