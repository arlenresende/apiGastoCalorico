const express = require('express')
const cors = require('cors')

const UserRoutes = require('./routes/UserRoutes')

const app = express()

// Config JSON response
app.use(express.json())

// Solve Cors
app.use(cors({ credentials: true, origin: 'https://6384b878603c3c63232c0016--fastidious-bublanina-269c4f.netlify.app/' }))

// Public folder for images
app.use(express.static('public'))

// Routes
app.use('/users', UserRoutes)

app.listen(8000)
