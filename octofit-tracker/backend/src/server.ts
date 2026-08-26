import express from 'express'
import mongoose from 'mongoose'
import database from './config/database.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const codespaceBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
})

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  duration: Number,
  date: Date,
})

const User = mongoose.model('User', userSchema, 'users')
const Activity = mongoose.model('Activity', activitySchema, 'activities')

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: database.readyState === 1 ? 'connected' : 'connecting',
  })
})

app.get('/api/users', async (_request, response) => {
  try {
    response.json(await User.find().select('-password').lean())
  } catch (error) {
    console.error('Error fetching users:', error)
    response.status(500).json({ error: 'Unable to fetch users' })
  }
})

app.get('/api/activities', async (_request, response) => {
  try {
    response.json(await Activity.find().lean())
  } catch (error) {
    console.error('Error fetching activities:', error)
    response.status(500).json({ error: 'Unable to fetch activities' })
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on ${codespaceBaseUrl}`)
})