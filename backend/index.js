import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import authRoute from './routes/authRoute.js'
import websiteRoute from './routes/websiteRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5174',
]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  credentials: true,
}

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/api/auth', authRoute)
app.use('/api/website', websiteRoute)
app.use('/api/payment', paymentRoute)

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server is listening at port : ${PORT}`)
  })
}

startServer()
