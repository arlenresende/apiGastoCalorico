const express = require('express')
const cors = require('cors')
require('dotenv').config()


const UserRoutes = require('./routes/UserRoutes')

const app = express()

// Config JSON response
app.use(express.json())

// Solve Cors

app.use(cors())

// Public folder for images
app.use(express.static('public'))

// Routes
app.use('/users', UserRoutes)

app.listen(8000)
